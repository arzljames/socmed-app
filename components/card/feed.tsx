import { useEffect, useRef, useState } from "react";
import ButtonComment from "../Custom/Button/ButtonComment";
import ButtonLike from "../Custom/Button/ButtonLike";
import ButtonShare from "../Custom/Button/ButtonShare";
import TextFeedName from "../Custom/Text/TextFeedName";
import TextParagraph from "../Custom/Text/TextFeedParagraph";
import TextFeedUsername from "../Custom/Text/TextFeedUsername";
import ReactTimeAgo from "react-time-ago";
import _ from "lodash";
import useUserData from "../../hooks/useUserData";
import {
  IoEllipsisVertical,
  IoPeople,
  IoGlobe,
  IoSend,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import {
  createNotification,
  DELETE,
  getComments,
  POST,
} from "../../utils/api/api";
import Error from "next/error";
import Overlay from "../Custom/Overlay";
import { socket } from "../../utils/socket";
import Link from "next/link";
import { UserProps } from "../../interface";
import { ThreeDots } from "react-loader-spinner";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import useToast from "../../hooks/useToast";
import OwnAvatar from "../avatar/own-avatar";
import DeletePostModal from "../modal/delete-modal";
import EditPostModal from "../modal/edit-post";
import SharePostModal from "../modal/share-post";
import Comments from "../../features/comments";
import OtherProfileAvatar from "../avatar/user-avatar";
import { NOTIFICATIONS } from "../../const";

const Feed = ({ data }: any): JSX.Element => {
  const { author } = data as { author: UserProps };
  const [optionDropdown, setOptionDropdown] = useState<Boolean>(false);
  const [deleteModal, setDeleteModal] = useState<Boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc" | boolean>("desc");
  const [filterBy, setFilterBy] = useState<number>(1);
  const [isShowingAllComments, setIsShowingAllComments] =
    useState<boolean>(false);
  const reactions = data.reactions as any;
  const { user, token, posts } = useUserData() as {
    user: UserProps;
    token: string;
    posts: any;
  };
  const findReaction = _.find(reactions, { reactor: user._id.toString() });
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>();
  const commentInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isReacted, setIsReacted] = useState<boolean>(false);

  useEffect(() => {
    fetchComments();
    const findReaction = _.find(reactions, { reactor: user._id.toString() });

    if (findReaction) {
      setIsReacted(true);
      return;
    }

    return () => setIsReacted(false);
  }, [posts]);

  const fetchComments = async () => {
    const res = await getComments(token, data?._id);
    setComments(res);
    return res;
  };

  const handleComment = async () => {
    if (!comment) return;
    setIsSubmitting(true);
    try {
      const res = await POST("/api/post/comment", token, {
        commentor: user._id,
        comment,
        postId: data._id,
      });

      // Create notification when comment submitted
      await createNotification(
        token,
        NOTIFICATIONS.COMMENT(
          user.profile.first_name,
          user.profile.last_name,
          data.author._id,
          user._id,
          data._id
        )
      );

      handleShowAllComments();
      setComment("");
      if (res) setComment("");
      setIsSubmitting(false);
      socket.emit("client:refresh_data");
      return res;
    } catch (error) {
      setIsSubmitting(false);
      throw new Error(error);
    }
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      const res = await DELETE(`/api/post/delete-post/${data._id}`, token);

      if (res) {
        setIsDeleting(false);
        setDeleteModal(false);
        useToast({ message: "Successfully deleted post", state: "success" });
      }
      socket.emit("client:refresh_data");
      return res;
    } catch (error) {
      setIsDeleting(false);
      throw new Error(error);
    }
  };

  const handleCommentInputRef = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleShowAllComments = () => {
    setIsShowingAllComments(true);
    setOrderBy("asc");
    setFilterBy(99999999);
  };

  const handleShowLessComments = () => {
    setIsShowingAllComments(false);
    setOrderBy("desc");
    setFilterBy(1);
  };

  const [typing, setTyping] = useState(false);
  const onBlur = () => socket.emit("typing", false);

  useAutosizeTextArea(commentInputRef.current, comment);

  useEffect(() => {
    socket.on("typed", (id) => {
      if (id === data?._id) {
        setTyping(true);
      } else {
        setTyping(false);
      }
    });
  }, []);

  return (
    <>
      <div className="relative z-0 mb-4 flex w-full flex-col rounded-xl bg-white  py-3 shadow-sm   md:py-4">
        <div className="flex px-3 md:px-6">
          {author._id === user._id ? (
            <OwnAvatar showStatus={true} />
          ) : (
            <OtherProfileAvatar
              initials={author?.profile?.initials}
              profile_color={author?.profile?.profile_color}
              profile_picture={author?.profile?.profile_photo}
            />
          )}

          <div className="0 flex flex-1 flex-col  ">
            <div className="mb-4">
              <div className="flex items-baseline">
                <div className="mr-1">
                  <TextFeedName>
                    {author?.profile.first_name +
                      " " +
                      author?.profile.last_name}{" "}
                  </TextFeedName>
                </div>

                <TextFeedUsername>
                  •{" "}
                  <ReactTimeAgo
                    date={new Date(data.createdAt)}
                    locale="en-US"
                    timeStyle="twitter"
                  />{" "}
                  {data.edited && "(Edited)"}
                </TextFeedUsername>
              </div>

              <Link
                href={{
                  pathname: "/homefeed/[post]",
                  query: { post: data._id },
                }}
                className="mt-[1px] flex items-center text-xs text-text-sub hover:underline"
              >
                {data.privacy === "Followers" ? (
                  <IoPeople className="mr-1" />
                ) : (
                  <IoGlobe className="mr-1" />
                )}
                <TextFeedUsername>@{data.author.username}</TextFeedUsername>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 px-3 md:px-6">
            <TextParagraph>{data.message}</TextParagraph>
          </div>
          {data?.attachments?.url && (
            <div className="mb-2 flex items-center justify-center border-y">
              {data?.attachments.type === "video/mp4" ||
              data?.attachments.type === "video/x-matroska" ? (
                <video
                  className="w-full cursor-pointer  object-cover"
                  src={data?.attachments?.url}
                  controls
                />
              ) : (
                <Link
                  href={{
                    pathname: "/homefeed/[post]",
                    query: { post: data._id },
                  }}
                >
                  <img
                    className="cursor-pointerobject-cover w-full"
                    src={data?.attachments?.url}
                    alt="attachment"
                  />
                </Link>
              )}
            </div>
          )}
          {data?.post && (
            <div className="mt-4 px-3 md:px-6">
              <div className="relative z-0 mb-4 flex w-full cursor-pointer flex-col rounded-xl  border bg-white py-3 shadow-sm md:py-4">
                <div className="flex px-3 md:px-6">
                  {data?.post.author._id === user._id ? (
                    <OwnAvatar showStatus={true} />
                  ) : (
                    <OtherProfileAvatar
                      initials={data?.post.author?.profile?.initials}
                      profile_color={data?.post.author?.profile?.profile_color}
                      profile_picture={
                        data?.post.author?.profile?.profile_photo
                      }
                    />
                  )}

                  <div className="0 flex flex-1 flex-col  ">
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <div className="mr-1">
                          <TextFeedName>
                            {data?.post.author?.profile.first_name +
                              " " +
                              data?.post.author?.profile.last_name}{" "}
                          </TextFeedName>
                        </div>

                        <TextFeedUsername>
                          •{" "}
                          <ReactTimeAgo
                            date={new Date(data.post.createdAt)}
                            locale="en-US"
                            timeStyle="twitter"
                          />{" "}
                          {data.post.edited && "(Edited)"}
                        </TextFeedUsername>
                      </div>

                      <div className="mt-[1px] flex items-center text-xs text-text-sub">
                        {data.privacy === "Followers" ? (
                          <IoPeople className="mr-1" />
                        ) : (
                          <IoGlobe className="mr-1" />
                        )}
                        <TextFeedUsername>
                          @{data.post.author.username}
                        </TextFeedUsername>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 px-3 md:px-6">
                    <TextParagraph>{data?.post.message}</TextParagraph>
                  </div>
                  {data.post?.attachments?.url && (
                    <div className="mb-2 flex items-center justify-center border-t">
                      {data.post?.attachments.type === "video/mp4" ||
                      data.post?.attachments.type === "video/x-matroska" ? (
                        <video
                          className="w-full cursor-pointer  object-cover"
                          src={data.post?.attachments?.url}
                          controls
                        />
                      ) : (
                        <img
                          className="cursor-pointerobject-cover w-full"
                          src={data.post?.attachments?.url}
                          alt="attachment"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between px-3 py-2 md:px-6">
            <p className="cursor-pointer text-xs text-text-sub hover:underline  md:text-xs">
              <span className="mr-1 text-base">
                {_.map(
                  _.uniqBy(data.reactions, "reaction_icon"),
                  "reaction_icon"
                )}
              </span>
              {!_.isEmpty(data.reactions) && data.reactions.length}
            </p>
            {!_.isEmpty(data.comments) && (
              <p className="text-xs text-text-sub md:text-xs">
                {data.comments.length}{" "}
                {data.comments.length > 1 ? "comments" : "comment"}
              </p>
            )}
          </div>
          <div className="flex px-3 md:px-6">
            <ButtonLike
              data={data}
              isReacted={isReacted}
              findReaction={findReaction}
            />
            <ButtonComment handleCommentInputRef={handleCommentInputRef} />
            <ButtonShare setIsSharing={setIsSharing} />
          </div>
          {!_.isEmpty(data.comments) && (
            <div className="mb-5 mt-3  px-3 pl-4 md:px-6">
              <div className="mb-3 flex justify-end border-b">
                {data.comments.length > 1 && !isShowingAllComments ? (
                  <p
                    onClick={handleShowAllComments}
                    className="mb-2 cursor-pointer text-sm font-light text-color-main-dark hover:underline"
                  >
                    Show remaining {data.comments.length - 1}
                    {data.comments.length - 1 > 1 ? " comments" : " comment"}
                  </p>
                ) : data.comments.length === 1 ? null : (
                  <p
                    onClick={handleShowLessComments}
                    className="mb-2 cursor-pointer text-sm font-light text-color-main-dark hover:underline"
                  >
                    Hide comments
                  </p>
                )}
              </div>

              {_.map(
                _.take(
                  _.orderBy(data.comments, "updatedAt", orderBy),
                  filterBy
                ),

                (comment: any, index: number) => {
                  return (
                    <Comments
                      key={index}
                      index={index}
                      comment={comment}
                      totalComment={data.comments.length}
                      isShowingAllComments={isShowingAllComments}
                    />
                  );
                }
              )}
            </div>
          )}
          {typing && (
            <div className="mt-2 flex w-full items-end justify-center text-xs text-text-sub">
              <p className="mr-2">Someone is typing</p>
              <ThreeDots
                height="16"
                width="16"
                radius="9"
                color="#6F6F6F"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          )}
          <div className=" mt-4 flex  px-3 md:px-6">
            <div className="relative z-0 flex h-auto w-full">
              {!comment && (
                <div className="absolute top-[50%] left-[3px] translate-y-[-50%]">
                  <OwnAvatar w="h-7" h="w-7" />
                </div>
              )}
              <textarea
                onBlur={onBlur}
                value={comment}
                ref={commentInputRef}
                onChange={(e) => {
                  socket.emit("typing", data._id);
                  setComment(e.target.value);
                }}
                placeholder="Write a comment"
                rows={0}
                className={`scrollbar-none min-h-[30px] w-full resize-none rounded-xl bg-slate-100 py-1.5 ${
                  !comment ? "pl-9" : "pl-3"
                }  pr-10 text-sm text-text-main outline-none placeholder:text-sm placeholder:font-light`}
              />

              <button
                className={`${
                  (isSubmitting || !comment) && "cursor-not-allowed opacity-50"
                }  pl-3 text-lg text-color-main hover:text-color-main-dark`}
                onClick={handleComment}
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            user._id !== author?._id ? null : setOptionDropdown(!optionDropdown)
          }
          className={`${
            optionDropdown && "bg-slate-200"
          } absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-slate-200 ${
            user._id !== author?._id && "cursor-not-allowed opacity-40"
          }`}
        >
          <IoEllipsisVertical className="text-text-sub" />
          {optionDropdown && (
            <div className="absolute right-0 top-[110%] min-w-[100px] rounded-lg border bg-white p-1 shadow-sm">
              <p
                onClick={() => setIsEditing(true)}
                className="flex w-full items-center rounded-md px-2 py-2 text-xs  font-medium text-text-sub hover:bg-slate-100"
              >
                <IoPencil className="mr-2" /> Edit
              </p>
              <p
                onClick={() => setDeleteModal(true)}
                className="flex items-center rounded-md px-2 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
              >
                <IoTrashBin className="mr-2" /> Delete
              </p>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <Overlay setOverlay={() => setIsEditing(false)}>
          <EditPostModal data={data} setIsEditing={setIsEditing} />
        </Overlay>
      )}

      {isSharing && (
        <Overlay setOverlay={() => setIsSharing(false)}>
          <SharePostModal
            data={data?.post ?? data}
            setIsSharing={setIsSharing}
          />
        </Overlay>
      )}

      {deleteModal && (
        <Overlay setDeleteModal={setDeleteModal}>
          <DeletePostModal
            setDeleteModal={setDeleteModal}
            isDeleting={isDeleting}
            handleDelete={handleDeletePost}
          />
        </Overlay>
      )}
    </>
  );
};

export default Feed;
