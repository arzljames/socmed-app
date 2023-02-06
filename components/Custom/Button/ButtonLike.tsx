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
import { useRouter } from "next/router";
import { REACTIONS_EMOJI } from "../../../const";
import Error from "next/error";
import { socket } from "../../../utils/socket";
import useSound from "../../../hooks/useSound";

const ButtonLike = ({
  findReaction,
  data,
}: {
  findReaction: any;
  data: any;
}): ReactElement => {
  const { user, token } = useUserData() as any;
  const router = useRouter();
  const [isHover, setIsHover] = useState<boolean>(false);

  const notification = (reaction: string, reaction_icon: string) => {
    return {
      notification_type: "Reaction",
      notification: `${
        user.profile.first_name + " " + user.profile.last_name
      } reacted ${reaction} to your post`,
      notify_to: data?.author?._id,
      notify_by: user._id,
      link: `/homefeed/post/${data._id}`,
      reaction_icon,
      post_id: data._id,
    };
  };

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
      await createNotification(token, notification(reaction, reaction_icon));
      setIsHover(false);
      socket.emit("client:refresh_data");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDefaultReact = async (reactionId?: string) => {
    useSound("/click.mp3");
    if (!reactionId) {
      try {
        await deleteReactNotifications(token, user._id, data._id);
        const res = await POST("/api/post/reaction/", token, {
          reactor: user._id,
          reaction_icon: "👍",
          reaction: "Like",
          postId: data._id,
        });
        await createNotification(token, notification("👍", "Like"));
        setIsHover(false);
        socket.emit("client:refresh_data");
        return res;
      } catch (error) {
        throw new Error(error);
      }
    } else {
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
      onClick={() => handleDefaultReact(findReaction?._id)}
      onMouseEnter={handleHoverBtn}
      onMouseLeave={handleRemoveHoverBtn}
      className={`relative flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-2    ${
        findReaction
          ? " border  text-color-main-dark "
          : "text-text-sub hover:bg-gray-100"
      }`}
    >
      {findReaction ? (
        <div className="flex  items-center ">
          <p>{findReaction.reaction_icon}</p>
          <p className="ml-2 text-xs font-semibold md:text-sm ">
            {findReaction.reaction}
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
