import React, { ReactElement, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import OtherProfileAvatar from "../../components/avatar/user-avatar";
import TextFeedName from "../../components/Custom/Text/TextFeedName";
import TextParagraph from "../../components/Custom/Text/TextFeedParagraph";
import TextFeedUsername from "../../components/Custom/Text/TextFeedUsername";
import useUserData from "../../hooks/useUserData";
import { UserProps } from "../../interface";
import _ from "lodash";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

const Comments = ({
  comment,
}: {
  index: number;
  comment: any;
  totalComment: number;
  isShowingAllComments: boolean;
}): ReactElement => {
  const { user } = useUserData() as { user: UserProps };

  const isAuthor = (id: string, commentor: string): boolean => {
    return id === commentor;
  };

  const [optionDropdown, setOptionDown] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${
          isAuthor(user?._id, comment?.commentor?._id) ? "mb-8" : "mb-4"
        } flex`}
      >
        <div className="z-10 flex items-start">
          <OtherProfileAvatar
            initials={comment.commentor.profile.initials}
            profile_color={comment.commentor.profile.profile_color}
            profile_picture={comment.commentor.profile.profile_picture}
          />
        </div>
        <div className="relative">
          <div className="flex w-auto flex-col rounded-xl bg-slate-100 p-3">
            <div className="mb-3 flex items-baseline ">
              <div className="mr-2">
                <TextFeedName>
                  {comment.commentor.profile.first_name +
                    " " +
                    comment.commentor.profile.last_name}
                </TextFeedName>
              </div>
              <TextFeedUsername>
                <ReactTimeAgo
                  date={new Date(comment.updatedAt)}
                  locale="en-US"
                  timeStyle="twitter"
                />
              </TextFeedUsername>
            </div>
            <TextParagraph>{comment.comment}</TextParagraph>

            {comment?.commenter?._id}
          </div>
          {user?._id === _.toString(comment.commenter?._id) && (
            <span className="mt-1 flex w-auto pt-2 text-xs text-color-main-dark">
              <p className="mr-2"></p>
              <p className="mr-2 cursor-pointer pl-10 hover:underline">Edit</p>
              <p className="cursor-pointer hover:underline">Delete</p>
            </span>
          )}
          {isAuthor(user?._id, comment?.commentor?._id) && (
            <div className="absolute left-2 mt-1 flex w-full cursor-pointer text-xs font-medium text-color-main-dark ">
              <p className="mr-2 hover:underline">Edit</p>
              <p className="hover:underline">Delete</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
