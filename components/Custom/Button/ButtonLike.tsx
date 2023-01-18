import React, { ReactElement, useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { postReaction } from "../../../api/api";
import useUserData from "../../../hooks/useUserData";
import _ from "lodash";
import { useRouter } from "next/router";
import useRefreshData from "../../../hooks/useRefreshData";

const ButtonLike = ({
  postId,
  initialReaction,
}: {
  postId: string;
  initialReaction: Boolean;
}): ReactElement => {
  const { user } = useUserData() as any;
  const router = useRouter();
  const handleReact = async () => {
    const payload = { reactor: user._id, reaction: 1 } as {
      reactor: string;
      reaction: number;
    };
    try {
      const res = await postReaction(
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
      className={`flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-2    ${
        initialReaction
          ? "border-red-100 bg-red-50 text-red-600 hover:border-red-100"
          : "text-text-sub hover:bg-gray-100"
      }`}
    >
      {initialReaction ? (
        <div className="flex items-center">
          <IoHeart /> <p className="ml-2 text-sm font-bold ">Love</p>
        </div>
      ) : (
        <div className="flex items-center">
          <IoHeartOutline /> <p className="ml-2 text-sm font-medium ">Love</p>
        </div>
      )}
    </div>
  );
};

export default ButtonLike;
