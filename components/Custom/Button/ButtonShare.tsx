import React, { Dispatch, SetStateAction } from "react";
import { IoArrowRedo, IoArrowRedoOutline } from "react-icons/io5";

const ButtonShare = ({
  setIsSharing,
}: {
  setIsSharing?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setIsSharing(true)}
      className=" flex w-[30%] cursor-pointer items-center justify-center rounded-xl border py-3 text-text-sub hover:bg-gray-100"
    >
      <IoArrowRedoOutline />
      <p className="ml-2 text-xs font-medium md:text-sm ">Share</p>
    </div>
  );
};

export default ButtonShare;
