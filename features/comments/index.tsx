import React, { ReactElement, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import OtherProfileAvatar from "../../components/avatar/user-avatar";
import TextFeedName from "../../components/Custom/Text/TextFeedName";
import TextParagraph from "../../components/Custom/Text/TextFeedParagraph";
import TextFeedUsername from "../../components/Custom/Text/TextFeedUsername";

const Comments = ({
  comment,
}: {
  index: number;
  comment: any;
  totalComment: number;
  isShowingAllComments: boolean;
}): ReactElement => {
  return (
    <div className="relative mb-4 flex">
      <div className="z-10">
        <OtherProfileAvatar
          initials={comment.commentor.profile.initials}
          profile_color={comment.commentor.profile.profile_color}
          profile_picture={comment.commentor.profile.profile_picture}
        />
      </div>

      <div className="flex w-auto flex-col rounded-2xl bg-slate-100 p-3">
        <div className="mb-2">
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
        </div>

        <TextParagraph>{comment.comment}</TextParagraph>
      </div>
    </div>
  );
};

export default Comments;
