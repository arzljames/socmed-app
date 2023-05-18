import { ReactElement, useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoDiscOutline,
} from "react-icons/io5";
import Overlay from "../Custom/Overlay";
import { signOut } from "next-auth/react";
import OwnAvatar from "../avatar/own-avatar";
import AvailabilityModal from "../modal/availability";
import { UserProps } from "../../interface";
import { PROFILE_DROPDOWN_LIST } from "../../const";
import { IconType } from "react-icons";
import _ from "lodash";
import { NextRouter, useRouter } from "next/router";

const ProfileDropdown = (): ReactElement => {
  const { user, status } = useUserData() as { user: UserProps; status: string };
  const name = user.profile.first_name + " " + user.profile.last_name;
  const [isOverlay, setIsOverlay] = useState<Boolean>(false);
  const router: NextRouter = useRouter();

  const handleClick = (name?: string, path?: string) => {
    if (path) router.push(path);

    if (name) {
      switch (name.toLowerCase()) {
        case "sign out":
          signOut({ callbackUrl: "/login" });
          break;

        case "active status":
          setIsOverlay(true);
          break;

        default:
          return;
      }
    }

    return;
  };

  return (
    <>
      <div className="absolute right-0 top-[100%] z-20 w-full overflow-y-scroll rounded-lg rounded-tr-none  rounded-tl-none  border bg-white bg-gradient-to-r p-2 pb-0 pr-0 shadow-xl md:top-[62px]   md:right-[10%] md:w-72 md:rounded-tl-lg md:rounded-tr-lg">
        <div className="flex w-full  items-center rounded-lg bg-gradient-to-r from-color-main to-color-main-2 p-2  py-3 opacity-90  shadow-md ">
          <div className="relative  mr-2 rounded-full border-2 border-white shadow-xl">
            <OwnAvatar w="w-11" h="h-11" mr="mr-0" ts="text-xl" />
          </div>

          <div className="flex flex-col items-start">
            <p className=" text-lg font-semibold text-white">{name}</p>
            <div className="flex items-center text-sm font-light text-[#ffffff]">
              <div
                className={`mr-1 h-2 w-2 rounded-full border border-white ${
                  status.toLowerCase() === "online"
                    ? "bg-green-500"
                    : "bg-orange-400"
                }`}
              ></div>
              <p>{status}</p>
            </div>
          </div>
        </div>
        <ul className="py-2">
          {_.map(
            PROFILE_DROPDOWN_LIST,
            (
              item: {
                name: string;
                icon: IconType;
                path?: Function;
                event?: any;
              },
              index: number
            ) => {
              return (
                <>
                  {PROFILE_DROPDOWN_LIST.length === index + 1 && (
                    <div className="my-1 h-[1px] w-full bg-gray-200"></div>
                  )}
                  <li
                    key={index}
                    onClick={() => handleClick(item.name, item.path(user._id))}
                    className="flex h-9 w-full cursor-pointer items-center rounded-md px-2 text-sm  text-text-sub hover:bg-gray-100 hover:text-text-main"
                  >
                    <item.icon className="mr-3" /> {item.name}
                  </li>
                </>
              );
            }
          )}
        </ul>
      </div>

      {isOverlay && (
        <Overlay setIsOverlay={setIsOverlay}>
          <AvailabilityModal setIsOverlay={setIsOverlay} />
        </Overlay>
      )}
    </>
  );
};

export default ProfileDropdown;
