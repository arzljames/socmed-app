import { ReactElement } from "react";

const ProfileCard = (): ReactElement => {
  return (
    <div className="relative flex min-h-[300px]  w-full flex-col rounded-xl  border border-color-bg-dark bg-white">
      <div className="h-24 rounded-t-xl bg-gray-400"></div>
      <div className="relative h-12 w-full ">
        <div className="absolute top-[-95%] left-[50%] h-20 w-20 translate-x-[-50%] rounded-full border-4 border-white bg-red-400"></div>
      </div>
      <div className="flex flex-col items-center justify-center border-b-[1px]  pb-4">
        <h1 className="font-bold text-text-main">Arzl James Lao</h1>
        <p className="text-xs font-medium text-text-sub">@arzljames3</p>
      </div>
      <div className="flex border-b-[1px] py-4">
        <div className="flex flex-1 flex-col items-center justify-center border-r-[1px]">
          <h4 className="font-lg font-bold text-text-main">123</h4>
          <p className="text-sm text-text-sub">Posts</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-sm">
          <h4 className="font-lg font-bold text-text-main">123</h4>{" "}
          <p className="text-sm text-text-sub">Friends</p>
        </div>
      </div>
      <div className="flex w-full cursor-pointer items-center justify-center rounded-b-xl py-4 hover:bg-color-bg-dark">
        <h2 className="text-sm font-semibold text-color-main-dark">
          View Profile
        </h2>
      </div>
    </div>
  );
};

export default ProfileCard;
