import { useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";
import { IoSettings, IoLogOut, IoDiscOutline } from "react-icons/io5";
import Overlay from "../Custom/Overlay";
import { signOut } from "next-auth/react";
import OwnAvatar from "../avatar/own-avatar";
import AvailabilityModal from "../modal/availability";

const ProfileDropdown = () => {
  const { user } = useUserData() as any;
  const name = user.profile.first_name + " " + user.profile.last_name;
  const [isOverlay, setIsOverlay] = useState<Boolean>(false);

  return (
    <>
      <div className="absolute right-0 top-[100%] z-20 w-full overflow-y-scroll rounded-lg  rounded-tr-none  rounded-tl-none bg-white bg-gradient-to-r p-2 pr-0 shadow-xl md:top-[64px]  md:right-[10%] md:w-72 md:rounded-tl-lg md:rounded-tr-lg">
        <div className="flex w-full  items-center rounded-lg bg-gradient-to-r from-color-main to-color-main-2 p-2  py-3 opacity-90  shadow-md ">
          <div className="relative  mr-2 rounded-full border-2 border-white shadow-xl">
            <OwnAvatar w="w-11" h="h-11" mr="mr-0" ts="text-xl" />
          </div>

          <div className="flex flex-col items-start">
            <p className=" text-lg font-semibold text-white">{name}</p>
            <p className="  cursor-pointer text-sm font-light text-[#ffffff] hover:underline">
              View Profile
            </p>
          </div>
        </div>
        <ul className="py-2">
          <li
            onClick={() => setIsOverlay(true)}
            className="flex h-9 w-full cursor-pointer items-center rounded-md px-2 text-sm text-text-sub hover:bg-gray-100 hover:text-text-main"
          >
            <IoDiscOutline className="mr-3" /> Availability status
          </li>
          <li className="flex h-9 w-full cursor-pointer items-center rounded-md px-2 text-sm  text-text-sub hover:bg-gray-100 hover:text-text-main">
            <IoSettings className="mr-3" /> Account settings
          </li>
          <li
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex h-9 w-full cursor-pointer items-center rounded-md px-2 text-sm  text-text-sub hover:bg-gray-100 hover:text-text-main"
          >
            <IoLogOut className="mr-3" /> Sign out
          </li>
        </ul>
      </div>

      {isOverlay && (
        <Overlay setIsOverlay={setIsOverlay}>
          <AvailabilityModal />
        </Overlay>
      )}
    </>
  );
};

export default ProfileDropdown;
