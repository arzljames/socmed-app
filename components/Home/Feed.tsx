import { ReactElement, useEffect, useState } from "react";
import ButtonComment from "../Custom/Button/ButtonComment";
import ButtonLike from "../Custom/Button/ButtonLike";
import ButtonShare from "../Custom/Button/ButtonShare";
import TextFeedName from "../Custom/Text/TextFeedName";
import TextParagraph from "../Custom/Text/TextFeedParagraph";
import TextFeedUsername from "../Custom/Text/TextFeedUsername";
import ReactTimeAgo from "react-time-ago";
import _ from "lodash";
import CalculateReaction from "../../utils/CalculateReaction";

const Feed = ({ data }: any): ReactElement => {
  const { author } = data as any;
  const [isCommenting, setIsCommenting] = useState<Boolean>(false);
  const [initialReaction, setInitialReaction] = useState<Boolean>(false);
  const { reactions } = data as any;

  useEffect(() => {
    const findReactor = _.find(reactions, { reactor: author._id.toString() });

    if (findReactor) {
      setInitialReaction(true);
    } else {
      setInitialReaction(false);
    }
  }, [data]);

  return (
    <div className="mb-4 flex w-full flex-col rounded-xl bg-white px-3 py-3 shadow-sm md:px-6  md:py-4">
      <div className="flex">
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
            <TextFeedUsername>
              @{author.username} —{" "}
              <ReactTimeAgo
                date={data.created_at}
                locale="en-US"
                timeStyle="round-minute"
              />
            </TextFeedUsername>
          </div>
        </div>
      </div>
      <div>
        <div>
          <TextParagraph>{data.message}</TextParagraph>
        </div>
        <div className="mt-4 flex justify-between  py-3">
          <p className="text-xs text-text-sub md:text-sm">
            {CalculateReaction(reactions, initialReaction)}
          </p>
          <p className="text-xs text-text-sub md:text-sm">4 comments</p>
        </div>
        <div className="flex ">
          <ButtonLike postId={data._id} initialReaction={initialReaction} />
          <ButtonComment setIsCommenting={setIsCommenting} />
          <ButtonShare />
        </div>
        {isCommenting && (
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            perferendis animi ut mollitia sed aliquid fuga blanditiis non
            aliquam praesentium doloremque nulla, laboriosam laborum. Voluptate
            error eveniet quisquam soluta fugit.
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
