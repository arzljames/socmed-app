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
  IoPeopleOutline,
  IoGlobeOutline,
  IoSend,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import { DELETE, POST } from "../../utils/api/api";
import Error from "next/error";
import Overlay from "../Custom/Overlay";
import { useRouter } from "next/router";
import { socket } from "../../utils/socket";
import Link from "next/link";
import { UserProps } from "../../interface";
import { ThreeDots } from "react-loader-spinner";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import useToast from "../../hooks/useToast";
import OwnAvatar from "../avatar/own-avatar";
import DeletePostModal from "../modal/delete-modal";
import EditPostModal from "../modal/edit-post";
import Comments from "../../features/comments";
import OtherProfileAvatar from "../avatar/user-avatar";

const FeedID = ({ data }: any): JSX.Element => {
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
  const router = useRouter();
  const commentInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isReacted, setIsReacted] = useState<boolean>(false);

  useEffect(() => {
    const findReaction = _.find(reactions, { reactor: user._id.toString() });

    if (findReaction) {
      setIsReacted(true);
      return;
    }

    return () => setIsReacted(false);
  }, [posts]);

  const handleComment = async () => {
    if (!comment) return;
    setIsSubmitting(true);
    try {
      const res = await POST("/api/post/comment", token, {
        commentor: user._id,
        comment,
        postId: data._id,
      });
      handleShowAllComments();
      setComment("");
      socket.emit("client:refresh_data");
      if (res) setComment("");
      setIsSubmitting(false);
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
      // router.push("/homefeed");
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

  socket.on("typed", (data) => {
    if (data) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  });

  useAutosizeTextArea(commentInputRef.current, comment);

  useEffect(() => {
    socket.emit("typing", false);
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
              <TextFeedName>
                {author?.profile.first_name + " " + author?.profile.last_name}{" "}
              </TextFeedName>

              <Link
                href={{
                  pathname: "/homefeed/[post]",
                  query: { post: data._id },
                }}
                className="mt-[1px] flex items-center text-xs text-text-sub hover:underline"
              >
                {data.privacy === "Followers" ? (
                  <IoPeopleOutline className="mr-1" />
                ) : (
                  <IoGlobeOutline className="mr-1" />
                )}
                <TextFeedUsername>
                  {data.privacy} —{" "}
                  <ReactTimeAgo
                    date={new Date(data.createdAt)}
                    locale="en-US"
                    timeStyle="round-minute"
                  />{" "}
                  {data.edited && "(Edited)"}
                </TextFeedUsername>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 px-3 md:px-6">
            <TextParagraph>{data.message}</TextParagraph>
          </div>
          {data?.attachments?.url && (
            <div className="mb-2 flex items-center justify-center">
              {data?.attachments.type === "video/mp4" ||
              data?.attachments.type === "video/x-matroska" ? (
                <video
                  className="w-full cursor-pointer border-y object-cover"
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
                    className="w-full cursor-pointer border-y object-cover"
                    src={data?.attachments?.url}
                    alt="attachment"
                  />
                </Link>
              )}
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
            <ButtonShare />
          </div>
          {!_.isEmpty(data.comments) && (
            <div className="my-5  px-3  pl-4 md:px-6">
              <div className="flex justify-end">
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
            <div className="flex w-full items-end justify-center text-xs text-text-sub">
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
          <div className=" mt-4 flex items-center justify-center  px-3 md:px-6">
            <div className="relative flex h-auto w-full">
              <div className="mt-[1px]">
                <OwnAvatar w="h-7" h="w-7" />
              </div>
              <textarea
                onBlur={onBlur}
                value={comment}
                ref={commentInputRef}
                onChange={(e) => {
                  socket.emit("typing", true);
                  setComment(e.target.value);
                }}
                placeholder="Write a comment"
                rows={0}
                className="scrollbar-none min-h-[30px] w-full resize-none rounded-xl bg-slate-100 py-1.5 pr-10 pl-4 text-sm text-text-main outline-none placeholder:text-sm placeholder:font-light"
              />
              {comment.replace(/\s/g, "") && comment?.length !== 0 && (
                <button
                  className={`${
                    isSubmitting && "cursor-not-allowed opacity-50"
                  } absolute top-[50%] right-0 h-8 translate-y-[-50%] px-3 text-lg text-color-main hover:text-color-main-dark`}
                  onClick={handleComment}
                >
                  <IoSend />
                </button>
              )}
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
          <IoEllipsisVertical />
          {optionDropdown && (
            <div className="absolute right-0 top-[110%] min-w-[100px] rounded-lg border bg-white py-1 shadow-sm">
              <p
                onClick={() => setIsEditing(true)}
                className="flex w-full items-center px-2 py-2 text-sm  font-medium text-text-sub hover:bg-slate-100"
              >
                <IoPencil className="mr-2" /> Edit
              </p>
              <p
                onClick={() => setDeleteModal(true)}
                className="flex items-center px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <IoTrashBin className="mr-2" /> Delete
              </p>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <Overlay>
          <EditPostModal data={data} setIsEditing={setIsEditing} />
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

export default FeedID;
