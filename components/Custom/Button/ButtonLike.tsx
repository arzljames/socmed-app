import React, { ReactElement, useEffect, useState } from "react";
import { IoThumbsUpOutline } from "react-icons/io5";
import {
  createNotification,
  DELETE,
  deleteReactNotifications,
  POST,
} from "../../../utils/api/api";
import useUserData from "../../../hooks/useUserData";
import _ from "lodash";
import { REACTIONS_EMOJI, NOTIFICATIONS } from "../../../const";
import Error from "next/error";
import { socket } from "../../../utils/socket";
import useSound from "../../../hooks/useSound";

const ButtonLike = ({
  isReacted,
  findReaction,
  data,
}: {
  isReacted: boolean;
  findReaction: any;
  data: any;
}): ReactElement => {
  const { user, token } = useUserData() as any;
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleReact = async ({
    reaction_icon,
    reaction,
  }: {
    reaction_icon: string;
    reaction: string;
  }) => {
    useSound("/click.mp3");
    try {
      await deleteReactNotifications(token, user._id, data._id);
      const res = await POST(`/api/post/reaction`, token, {
        reactor: user._id,
        reaction_icon,
        reaction,
        postId: data._id,
      });

      await createNotification(
        token,
        NOTIFICATIONS.REACTION(
          user.profile.first_name,
          user.profile.last_name,
          reaction,
          data.author._id,
          user._id,
          reaction_icon,
          data._id
        )
      );

      setIsHover(false);
      socket.emit("client:refresh_data");

      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRemoveReact = async (reactionId?: string) => {
    useSound("/click.mp3");
    if (reactionId) {
      try {
        await deleteReactNotifications(token, user._id, data._id);
        const res = await DELETE(
          `/api/post/remove-reaction/${reactionId}`,
          token
        );
        setIsHover(false);
        socket.emit("client:refresh_data");
        return res;
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const handleHoverBtn = () => {
    setIsHover(true);
  };

  const handleRemoveHoverBtn = () => {
    setIsHover(false);
  };

  return (
    <div
      onClick={() => handleRemoveReact(findReaction?._id)}
      onMouseEnter={handleHoverBtn}
      onMouseLeave={handleRemoveHoverBtn}
      className={`relative flex w-[30%] cursor-pointer select-none items-center justify-center rounded-xl border py-2    ${
        isReacted
          ? " border border-slate-300  bg-blue-50 text-color-main"
          : "text-text-sub hover:bg-gray-100"
      }`}
    >
      {isReacted ? (
        <div className="flex  items-center ">
          <p>{findReaction?.reaction_icon}</p>
          <p className="ml-2 text-xs font-semibold md:text-sm ">
            {findReaction?.reaction}
          </p>
        </div>
      ) : (
        <div className="flex  items-center ">
          <IoThumbsUpOutline />
          <p className="ml-2 text-xs font-medium md:text-sm ">React</p>
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
                    className={`mx-1 text-2xl   grayscale duration-100 ease-in-out hover:translate-y-[-5px] hover:scale-[160%] hover:grayscale-0 `}
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
