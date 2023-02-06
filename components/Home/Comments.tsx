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
    <div className="relative mb-4 flex border-b pb-4">
      <div className="z-10">
        <OtherProfileAvatar
          initials={comment.commentor.profile.initials}
          profile_color={comment.commentor.profile.profile_color}
          profile_picture={comment.commentor.profile.profile_picture}
        />
      </div>

      <div className="flex flex-col ">
        <TextFeedName>
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

        <p className="mt-2 text-sm text-text-main">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comments;
