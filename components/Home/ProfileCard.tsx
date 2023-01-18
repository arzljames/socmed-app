import { ReactElement } from "react";
import useUserData from "../../hooks/useUserData";
import ProfileAvatar from "./ProfileAvatar";

const ProfileCard = (): ReactElement => {
  const { user } = useUserData() as any;
  const name = user.profile.first_name + " " + user.profile.last_name;
  const username = user.username;
  return (
    <div className="border-color-bg-dark relative flex min-h-[300px]  w-full flex-col rounded-xl  border bg-white shadow-sm">
      <div className="h-24 overflow-hidden rounded-t-xl bg-slate-300">
        <img
          src="/default_cover.jpg"
          className="object-cover object-center"
          alt="cover"
        />
      </div>
      <div className="relative h-12 w-full ">
        <div className="absolute top-[-95%] left-[50%] h-20 w-20 translate-x-[-50%] overflow-hidden rounded-full border-4 border-white ">
          <ProfileAvatar h="h-full" w="w-full" ts="text-4xl" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b-[1px]  pb-4">
        <h1 className="font-bold text-text-main">{name}</h1>
        <p className="text-xs font-medium text-text-sub">@{username}</p>
      </div>
      <div className="flex border-b-[1px] py-4">
        <div className="flex flex-1 flex-col items-center justify-center border-r-[1px] ">
          <h4 className="font-lg font-bold text-text-main">3</h4>
          <p className="text-sm text-text-sub">Posts</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-sm">
          <h4 className="font-lg font-bold text-text-main">4</h4>{" "}
          <p className="text-sm text-text-sub">Friends</p>
        </div>
      </div>
      <div className="flex w-full cursor-pointer items-center justify-center rounded-b-xl py-4 hover:bg-color-main-light">
        <h2 className="text-sm font-semibold text-color-main-dark">
          View Profile
        </h2>
      </div>
    </div>
  );
};

export default ProfileCard;
