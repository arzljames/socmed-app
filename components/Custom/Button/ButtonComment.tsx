import React from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ButtonComment = ({
  handleCommentInputRef,
}: {
  handleCommentInputRef?: () => void;
}) => {
  return (
    <div
      onClick={handleCommentInputRef}
      className="mx-2 flex w-[40%] cursor-pointer  items-center justify-center rounded-xl border py-3 text-text-sub hover:bg-gray-100 "
    >
      <IoChatboxEllipsesOutline />
      <p className="ml-2 text-xs font-medium md:text-sm ">Comment</p>
    </div>
  );
};

export default ButtonComment;
