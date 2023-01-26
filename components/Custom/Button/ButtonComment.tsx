import React, { Dispatch, SetStateAction } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ButtonComment = () => {
  return (
    <div className="mx-2 flex w-[40%] cursor-pointer items-center justify-center rounded-xl border py-3 text-text-sub hover:bg-gray-100">
      <IoChatboxEllipsesOutline />{" "}
      <p className="ml-2 text-sm font-medium ">Comment</p>
    </div>
  );
};

export default ButtonComment;
