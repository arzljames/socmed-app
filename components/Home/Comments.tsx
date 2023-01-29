import React, { ReactElement, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import TextFeedName from "../Custom/Text/TextFeedName";
import TextFeedUsername from "../Custom/Text/TextFeedUsername";
import OtherProfileAvatar from "./OtherProfileAvatar";

const Comments = ({
  index,
  comment,
  totalComment,
  isShowingAllComments,
}: {
  index: number;
  comment: any;
  totalComment: number;
  isShowingAllComments: Boolean;
}): ReactElement => {
  return (
    <div className="relative flex">
      <div className="z-10">
        <OtherProfileAvatar
          initials={comment.commentor.profile.initials}
          profile_color={comment.commentor.profile.profile_color}
          profile_picture={comment.commentor.profile.profile_picture}
          h="h-7"
          w="w-7"
        />
      </div>
      <div className=" absolute left-3 h-full w-[1px] bg-gray-300"></div>
      <div>
        <div className="flex h-7 items-center ">
          <TextFeedName style="mr-2">
            {comment.commentor.profile.first_name +
              " " +
              comment.commentor.profile.last_name}
          </TextFeedName>
          <TextFeedUsername>
            <ReactTimeAgo
              date={new Date(comment.updatedAt)}
              locale="en-US"
              timeStyle="round-minute"
            />
          </TextFeedUsername>
        </div>
        <div
          className={`${
            index + 1 === totalComment || !isShowingAllComments
              ? "pb-0"
              : "pb-8"
          }`}
        >
          <p className="text-sm text-text-main">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
