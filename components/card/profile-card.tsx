import { ReactElement, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { IoCameraOutline, IoCreate, IoPeople } from "react-icons/io5";
import { UserProps } from "../../interface";
import _ from "lodash";
import OwnAvatar from "../avatar/own-avatar";

const ProfileCard = ({ data }: any): ReactElement => {
  const { user, posts, postCount } = useUserData() as {
    user: UserProps;
    posts: any;
    postCount: number;
  };
  const name = user?.profile?.first_name + " " + user?.profile?.last_name;
  const username = user?.username;

  return (
    <div className="border-color-bg-dark relative   mb-4 w-full flex-col  rounded-xl border bg-white">
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-t-xl bg-slate-200">
        <IoCameraOutline className="text-5xl text-white" />
      </div>
      <div className="relative h-10 w-full  ">
        <div className="absolute top-[-110%] left-[50%] h-20 w-20 translate-x-[-50%] overflow-hidden rounded-full border-4 border-white ">
          <OwnAvatar h="h-full" w="w-full" ts="text-4xl" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b-[1px]   pb-4">
        <h1 className="font-semibold text-text-main">{name}</h1>
        <p className="text-xs  text-text-sub">@{username}</p>
      </div>
      <div className="flex border-b-[1px] py-2">
        <div className="flex flex-1 flex-col items-center justify-end border-r-[1px] ">
          <h4 className="font-lg flex  items-center text-sm font-semibold text-text-main">
            {postCount}
          </h4>
          <div className="flex items-center text-xs font-light text-text-sub">
            <IoCreate className="mr-1" />
            <p>{postCount > 1 ? "Posts" : "Post"}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-end ">
          <h4 className="font-lg flex items-center text-sm font-semibold text-text-main">
            {user?.followers?.length}
          </h4>
          <div className="flex items-center text-xs font-light text-text-sub">
            <IoPeople className="mr-1" />
            <p>Followers</p>
          </div>
        </div>
      </div>
      <div className=" flex w-full cursor-pointer items-center justify-center  rounded-b-xl p-0 py-3 text-color-main-dark ">
        <h2 className="text-sm font-medium text-color-main">View Profile</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
