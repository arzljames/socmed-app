import React, { ReactElement, useEffect, useState } from "react";
import { IoThumbsUpOutline } from "react-icons/io5";
import { DELETE, POST } from "../../../api/api";
import useUserData from "../../../hooks/useUserData";
import _, { find } from "lodash";
import { useRouter } from "next/router";
import useRefreshData from "../../../hooks/useRefreshData";
import { REACTIONS_EMOJI } from "../../../const";
import { Tooltip } from "react-tooltip";
import { socket } from "../../../utils/socket";

const ButtonLike = ({
  findReaction,
  data,
}: {
  findReaction: any;
  data: any;
}): ReactElement => {
  const { user, setPosts, posts } = useUserData() as any;
  const router = useRouter();
  const [isHover, setIsHover] = useState<Boolean>(false);

  const handleReact = async ({
    reaction_icon,
    reaction,
  }: {
    reaction_icon: string;
    reaction: string;
  }) => {
    try {
      const res = await POST(`/api/post/reaction`, user.access_token, {
        reactor: user._id,
        reaction_icon,
        reaction,
        postId: data._id,
      });
      useRefreshData(router);
      setIsHover(false);
      return res;
    } catch (error) {}
  };

  const handleRemoveReact = async (reactionId?: string) => {
    if (!reactionId) return;
    try {
      const res = await DELETE(
        `/api/post/remove-reaction/${reactionId}`,
        user.access_token
      );
      useRefreshData(router);
      setIsHover(false);
      return res;
    } catch (error) {}
  };

  return (
    <div
      onClick={() => handleRemoveReact(findReaction?._id)}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className={`relative flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-2    ${
        findReaction
          ? " border border-blue-200 bg-blue-100 text-color-main-dark "
          : "text-text-sub hover:bg-gray-100"
      }`}
    >
      {findReaction ? (
        <div className="flex items-center ">
          <p>{findReaction.reaction_icon}</p>
          <p className="ml-2 text-sm font-semibold ">{findReaction.reaction}</p>
        </div>
      ) : (
        <div className="flex items-center">
          <IoThumbsUpOutline />
          <p className="ml-2 text-sm font-medium ">React</p>
        </div>
      )}

      {isHover && (
        <div className="absolute left-0 bottom-[100%] z-50 py-2">
          <div className=" flex rounded-full border bg-white py-2 px-2 shadow-lg">
            {_.map(
              REACTIONS_EMOJI,
              (item: {
                id: number;
                reaction: string;
                reaction_icon: string;
              }) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReact({
                        reaction: item.reaction,
                        reaction_icon: item.reaction_icon,
                      });
                    }}
                    key={item.id}
                    className={`mx-1 text-xl   grayscale duration-100 ease-in-out hover:translate-y-[-5px] hover:scale-[160%] hover:grayscale-0 `}
                  >
                    {item.reaction_icon}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonLike;
