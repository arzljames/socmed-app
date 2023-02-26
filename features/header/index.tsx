import { ReactElement, useRef } from "react";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoNotifications,
} from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import useUserData from "../../hooks/useUserData";
import OwnAvatar from "../../components/avatar/own-avatar";
import NotificationDropdown from "../../components/dropdown/notification-dropdown";
import ProfileDropdown from "../../components/dropdown/profile-dropdown";

const Header = (): ReactElement => {
  const ref = useRef();
  const [isNotificationOpen, setIsNotificationOpen] = useState<Boolean>(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState<Boolean>(false);
  const { notifications } = useUserData() as any;

  const handleNotifDropDown = () => {
    setIsSignOutOpen(false);
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleProfileDropDown = () => {
    setIsNotificationOpen(false);
    setIsSignOutOpen(!isSignOutOpen);
  };

  return (
    <header
      className={
        "z-20 flex h-[60px] w-full items-center justify-between bg-white px-3 shadow-sm sm:px-10 md:px-[10%]"
      }
    >
      <Link href="/homefeed">
        <img className="h-9" src="/assets/branding.svg" alt="CreatVe" />
      </Link>

      <div className="-50 relative hidden w-[40%] md:flex">
        <div className="relative h-8 w-full">
          <input
            type="text"
            className="h-full w-full rounded-xl border  border-transparent bg-slate-100 pl-8 text-sm outline-none placeholder:text-xs placeholder:font-light focus:border-color-main focus:bg-white focus:shadow-md hover:border-slate-300 hover:bg-white focus:hover:border-color-main-light "
            placeholder="Search and discover amazing things..."
          />
          <IoSearchOutline
            className="absolute left-2 top-[50%] translate-y-[-50%] text-gray-400"
            fontSize={20}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200 md:hidden">
          <IoSearchOutline className="text-gray-800" fontSize={20} />
        </div>
        <div
          onClick={handleNotifDropDown}
          className={`relative mr-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200  ${
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

        <div
          onClick={handleProfileDropDown}
          className={`relative rounded-full border-2 border-transparent ${
            isSignOutOpen && "ml-1 border-gray-300"
          } p-[1px]`}
        >
          <OwnAvatar
            w={`${isSignOutOpen ? "w-8" : "w-9"}`}
            h={`${isSignOutOpen ? "h-8" : "h-9"}`}
            mr="mr-0"
          />
        </div>
      </div>

      {isNotificationOpen && <NotificationDropdown ref={ref} />}
      {isSignOutOpen && <ProfileDropdown />}
    </header>
  );
};

export default Header;
