import { ReactElement, useRef } from "react";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoNotifications,
} from "react-icons/io5";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import ProfileHeaderAvatar from "./ProfileHeaderAvatar";
import SignOutDropdown from "./SignOutDropdown";
import Link from "next/link";

const Header = (): ReactElement => {
  const ref = useRef();
  const [isNotificationOpen, setIsNotificationOpen] = useState<Boolean>(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState<Boolean>(false);

  useOnClickOutside(ref, () => setIsNotificationOpen(false));

  const handleDropDown = () => {
    setIsSignOutOpen(false);
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header
      className={
        "flex h-[60px] w-full items-center justify-between bg-white  px-3 shadow-md sm:px-10 md:px-[10%]"
      }
    >
      <Link href="/">
        <img className="h-9" src="/logo-dark.svg" alt="SocMed" />
      </Link>
      {/* <input
        type="search"
        className="hidden h-8  rounded-full bg-gray-100 px-4 text-sm outline-none placeholder:text-xs md:flex md:w-1/3"
        placeholder="#Search and discover things in SocMed"
      /> */}
      <div className="flex items-center justify-end">
        <div className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 md:hidden">
          <IoSearchOutline className="text-gray-800" fontSize={20} />
        </div>
        <div
          onClick={handleDropDown}
          className={`relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200  ${
            isNotificationOpen ? "bg-gray-200" : "bg-white"
          }`}
        >
          <div className="absolute top-[-2px] right-[-2px] flex h-5 w-6 items-center justify-center rounded-full border-2  border-white bg-red-500 text-xs font-semibold text-white">
            9+
          </div>
          {isNotificationOpen ? (
            <IoNotifications className="text-gray-800" fontSize={20} />
          ) : (
            <IoNotificationsOutline className="text-gray-800" fontSize={20} />
          )}
        </div>

        <ProfileHeaderAvatar
          setIsNotificationOpen={setIsNotificationOpen}
          setIsSignOutOpen={setIsSignOutOpen}
          isSignOutOpen={isSignOutOpen}
        />
      </div>

      {isNotificationOpen && <NotificationPanel ref={ref} />}
      {isSignOutOpen && <SignOutDropdown />}
    </header>
  );
};

export default Header;
