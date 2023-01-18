import React, { Dispatch, SetStateAction } from "react";
import { IoChatboxEllipses, IoChatboxEllipsesOutline } from "react-icons/io5";
import { IsCommentingProps } from "../../../interface";

const ButtonComment = ({ setIsCommenting }: IsCommentingProps) => {
  return (
    <div
      onClick={() => setIsCommenting(true)}
      className="mx-2 flex w-[40%] cursor-pointer items-center justify-center rounded-xl border py-3 text-text-sub hover:bg-gray-100"
    >
      <IoChatboxEllipsesOutline />{" "}
      <p className="ml-2 text-sm font-medium ">Comment</p>
    </div>
  );
};

export default ButtonComment;
