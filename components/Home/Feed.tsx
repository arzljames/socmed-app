import { ReactElement, useEffect, useState } from "react";
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
} from "react-icons/io5";
import { POST } from "../../api/api";
import Error from "next/error";
import ProfileAvatar from "./ProfileAvatar";

const Feed = ({ data }: any): ReactElement => {
  const { author } = data as any;
  const [optionDropdown, setOptionDropdown] = useState<Boolean>(false);
  const reactions = data.reactions as any;
  const { user } = useUserData() as any;
  const findReaction = _.find(reactions, { reactor: user._id.toString() });
  const [comment, setComment] = useState<string>("");

  const handleComment = async () => {
    try {
      const res = await POST("/api/post/comment", user.access_token, {
        commentor: user._id,
        comment,
        postId: data._id,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="relative mb-4 flex w-full flex-col rounded-xl bg-white px-3 py-3 shadow-sm md:px-6  md:py-4">
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

            <div className="flex items-center text-xs  text-text-sub">
              {data.privacy === "Friends" ? (
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
                />
              </TextFeedUsername>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <TextParagraph>{data.message}</TextParagraph>
        </div>
        <div className="mt-4 flex justify-between  py-3">
          <p className="cursor-pointer text-xs text-text-sub hover:underline  md:text-xs">
            <span className="mr-1 text-base">
              {_.map(
                _.uniqBy(data.reactions, "reaction_icon"),
                "reaction_icon"
              )}
            </span>
            {data.reactions.length > 0 && data.reactions.length}
          </p>
          <p className="text-xs text-text-sub md:text-xs">
            {data.comments.length} comments
          </p>
        </div>
        <div className="flex">
          <ButtonLike data={data} findReaction={findReaction} />
          <ButtonComment />
          <ButtonShare />
        </div>

        <div className="mt-3 flex border-t-[1px]  pt-3">
          <div>
            <ProfileAvatar w="h-8" h="w-8" />
          </div>
          <div className="relative w-full">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="h-8 w-full rounded-full bg-gray-100 pr-10 pl-3 text-sm text-text-main outline-none placeholder:text-sm placeholder:font-light"
            />
            {comment?.length !== 0 && (
              <button
                className="absolute right-0 top-0 h-8  px-3 text-color-main-dark"
                onClick={() => alert("sd")}
              >
                <IoSend />
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => setOptionDropdown(!optionDropdown)}
        className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-slate-200"
      >
        <IoEllipsisVertical />
        {optionDropdown && (
          <div className="absolute right-0 top-[110%] rounded-lg border bg-white py-1 shadow-md">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
