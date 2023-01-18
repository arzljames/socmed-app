import React from "react";
import { IoArrowRedo, IoArrowRedoOutline } from "react-icons/io5";

const ButtonShare = () => {
  return (
    <div className=" flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-3 text-text-sub hover:bg-gray-100">
      <IoArrowRedoOutline />
      <p className="ml-2 text-sm font-medium ">Share</p>
    </div>
  );
};

export default ButtonShare;
