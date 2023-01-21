import React, { ReactElement, useEffect, useState } from "react";
import { IoThumbsUpOutline } from "react-icons/io5";
import { POST } from "../../../api/api";
import useUserData from "../../../hooks/useUserData";
import _ from "lodash";
import { useRouter } from "next/router";
import useRefreshData from "../../../hooks/useRefreshData";
import { REACTIONS_EMOJI } from "../../../const";
import { Tooltip } from "react-tooltip";

const ButtonLike = ({
  postId,
  initialReaction,
}: {
  postId: string;
  initialReaction: Boolean;
}): ReactElement => {
  const { user } = useUserData() as any;
  const router = useRouter();
  const [isHover, setIsHover] = useState<Boolean>(false);
  const handleReact = async () => {
    const payload = { reactor: user._id, reaction: 1 } as {
      reactor: string;
      reaction: number;
    };
    try {
      const res = await POST(
        `/api/post/${postId}/reaction`,
        user.access_token,
        payload
      );

      useRefreshData(router);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleReact}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`relative flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-2    ${
        initialReaction
          ? " bg-slate-100 text-color-main "
          : "text-text-sub hover:bg-gray-100"
      }`}
    >
      {initialReaction ? (
        <div className="flex items-center ">
          <p className="ml-2 text-sm font-semibold ">React</p>
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
              (item: { id: number; name: string; reaction: string }) => {
                return (
                  <div
                    key={item.id}
                    className={`mx-1 text-xl   grayscale duration-100 ease-in-out hover:translate-y-[-5px] hover:scale-[160%] hover:grayscale-0 `}
                  >
                    {item.reaction}
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
