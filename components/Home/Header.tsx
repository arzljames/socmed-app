import { ReactElement, useEffect, useRef } from "react";
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
import useUserData from "../../hooks/useUserData";

const Header = (): ReactElement => {
  const ref = useRef();
  const [isNotificationOpen, setIsNotificationOpen] = useState<Boolean>(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState<Boolean>(false);
  const { notifications } = useUserData() as any;
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
      <Link href="/homefeed">
        <img className="h-9" src="/logo-dark.svg" alt="CreatVe" />
      </Link>

      <div className="-50 relative hidden w-[40%] md:flex">
        <div className="relative h-8 w-full">
          <input
            type="text"
            className="h-full w-full rounded-xl border border-transparent bg-gray-100 pl-8 text-sm outline-none placeholder:text-xs placeholder:font-light focus:border-slate-300"
            placeholder="Search and discover amazing things..."
          />
          <IoSearchOutline
            className="absolute left-2 top-[50%] translate-y-[-50%] text-color-main-dark"
            fontSize={20}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200 md:hidden">
          <IoSearchOutline className="text-gray-800" fontSize={20} />
        </div>
        <div
          onClick={handleDropDown}
          className={`relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200  ${
            isNotificationOpen ? "bg-gray-200" : "bg-white"
          }`}
        >
          {notifications?.meta?.total_unread !== 0 && (
            <div className="absolute top-[-2px] right-[-2px] flex h-5 w-6 items-center justify-center rounded-full border-2  border-white bg-red-500 text-xs font-semibold text-white">
              {notifications?.meta?.total_unread > 9
                ? "9+"
                : notifications?.meta?.total_unread}
            </div>
          )}
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
