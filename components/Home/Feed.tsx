import { ReactElement, useRef, useState } from "react";
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
  IoWarning,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import { DELETE, POST } from "../../utils/api/api";
import Error from "next/error";
import ProfileAvatar from "./ProfileAvatar";
import Overlay from "../Custom/Overlay";
import TextHeading from "../Custom/Text/TextHeading";
import CustomLoader from "../Custom/Loader";
import useRefreshData from "../../hooks/useRefreshData";
import { useRouter } from "next/router";
import Comments from "./Comments";
import { socket } from "../../utils/socket";
import Link from "next/link";
import { UserProps } from "../../interface";
import EditPostModal from "./EditPostModal";
import toast from "react-hot-toast";

const Feed = ({ data }: any): JSX.Element => {
  const { author } = data as { author: UserProps };
  const [optionDropdown, setOptionDropdown] = useState<Boolean>(false);
  const [deleteModal, setDeleteModal] = useState<Boolean>(false);
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc" | boolean>("desc");
  const [filterBy, setFilterBy] = useState<number>(1);
  const [isShowingAllComments, setIsShowingAllComments] =
    useState<boolean>(false);
  const reactions = data.reactions as any;
  const { user, token } = useUserData() as any;
  const findReaction = _.find(reactions, { reactor: user._id.toString() });
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const commentInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleComment = async () => {
    if (!comment) return;
    try {
      const res = await POST("/api/post/comment", token, {
        commentor: user._id,
        comment,
        postId: data._id,
      });
      useRefreshData(router);
      handleShowAllComments();
      setComment("");
      socket.emit("client:refresh_data");
      return res;
    } catch (error) {
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

        toast.success("Successfully deleted post", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: 14,
          },
        });
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

  return (
    <>
      <div className="relative mb-4 flex w-full flex-col rounded-xl bg-white  py-3 shadow-sm   md:py-4">
        <div className="flex px-3 md:px-6">
          <div
            className={`mr-2 flex  h-9 w-9 items-center justify-center rounded-full ${author.profile.profile_color} cursor-pointer `}
          >
            {!author?.profile?.profile_photo ? (
              <p className={"font-semibold text-white"}>
                {author.profile.initials}
              </p>
            ) : (
              <img src="/" alt="Avatar" />
            )}
          </div>

          <div className="0 flex flex-1 flex-col  ">
            <div className="mb-4">
              <TextFeedName>
                {author.profile.first_name + " " + author.profile.last_name}{" "}
              </TextFeedName>

              <Link
                href={{
                  pathname: "/homefeed/[post]",
                  query: { post: data._id },
                }}
                className="mt-[1px] flex items-center text-xs text-text-sub hover:underline"
              >
                {data.privacy === "Friends" ? (
                  <IoPeopleOutline className="mr-1" />
                ) : (
                  <IoGlobeOutline className="mr-1" />
                )}
                <TextFeedUsername>
                  {data.privacy} ???{" "}
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
            <ButtonLike data={data} findReaction={findReaction} />
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

          <div className=" mt-4 flex px-3  md:px-6">
            <div className="relative w-full">
              <div className="absolute left-1 top-[50%]  translate-y-[-50%]">
                <ProfileAvatar w="h-7" h="w-7" />
              </div>
              <input
                value={comment}
                ref={commentInputRef}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment"
                className="h-9 w-full rounded-full bg-gray-100 pr-10 pl-10 text-sm text-text-main outline-none placeholder:text-sm placeholder:font-light"
              />
              {comment?.length !== 0 && (
                <button
                  className="absolute right-0 top-0 h-8  px-3 text-color-main-dark"
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
            user._id !== author._id ? null : setOptionDropdown(!optionDropdown)
          }
          className={`${
            optionDropdown && "bg-slate-200"
          } absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-slate-200 ${
            user._id !== author._id && "cursor-not-allowed opacity-40"
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

        {deleteModal && (
          <Overlay setDeleteModal={setDeleteModal}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-xl bg-white p-5 shadow-md md:w-1/3"
            >
              <TextHeading>Delete Post</TextHeading>
              <div className="my-5">
                <p className="mb-2 text-sm text-text-main">
                  Are you really sure you want to delete this post?
                </p>
                <div className="flex items-center rounded-l-sm rounded-r-md border-l-2 border-red-500 bg-red-100 p-3">
                  <IoWarning className="mr-2 text-3xl text-red-600" />
                  <p className="text-[13px] text-red-500">
                    This action is irreversible. You will no longer be able to
                    retrieve this in the future.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="mr-2 rounded-lg border px-3 py-2 text-sm duration-100 ease-in-out hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className={`flex rounded-lg border bg-red-500 px-3 py-2 text-sm text-white ${
                    isDeleting && "pointer-events-none opacity-50"
                  } duration-100 ease-in-out hover:bg-red-600`}
                >
                  {isDeleting && (
                    <CustomLoader h="15" w="15" c="#fff" m="mr-2" />
                  )}
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </Overlay>
        )}
      </div>
      {isEditing && (
        <Overlay>
          <EditPostModal data={data} setIsEditing={setIsEditing} />
        </Overlay>
      )}
    </>
  );
};

export default Feed;
