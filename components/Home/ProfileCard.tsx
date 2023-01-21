import { ReactElement } from "react";
import useUserData from "../../hooks/useUserData";
import ProfileAvatar from "./ProfileAvatar";
import { IoCameraOutline, IoPencil } from "react-icons/io5";

const ProfileCard = (): ReactElement => {
  const { user } = useUserData() as any;
  const name = user.profile.first_name + " " + user.profile.last_name;
  const username = user.username;
  return (
    <div className="border-color-bg-dark relative   mb-4 w-full flex-col  rounded-xl border bg-white">
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-t-xl bg-slate-200">
        <IoCameraOutline className="text-5xl text-white" />
        <div className="absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1 text-gray-400 hover:bg-gray-50">
          <IoPencil />
        </div>
      </div>
      <div className="relative h-10 w-full ">
        <div className="absolute top-[-110%] left-[50%] h-20 w-20 translate-x-[-50%] overflow-hidden rounded-full border-4 border-white ">
          <ProfileAvatar h="h-full" w="w-full" ts="text-4xl" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b-[1px]  pb-4">
        <h1 className="font-semibold text-text-main">{name}</h1>
        <p className="text-xs  text-text-sub">@{username}</p>
      </div>
      <div className="flex border-b-[1px] py-2">
        <div className="flex flex-1 flex-col items-center justify-center border-r-[1px] ">
          <h4 className="font-lg font-semibold text-text-main">3</h4>
          <p className="text-sm text-text-sub">Posts</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-sm">
          <h4 className="font-lg font-semibold text-text-main">4</h4>{" "}
          <p className="text-sm text-text-sub">Friends</p>
        </div>
      </div>
      <div className="flex w-full cursor-pointer items-center justify-center rounded-b-xl py-3 text-color-main-dark hover:underline">
        <h2 className="text-sm font-medium text-color-main-dark">
          View Profile
        </h2>
      </div>
    </div>
  );
};

export default ProfileCard;
