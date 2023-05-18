import { ReactElement, useRef } from "react";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoNotifications,
} from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import useUserData from "../../hooks/useUserData";
import OwnAvatar from "../avatar/own-avatar";
import NotificationDropdown from "../dropdown/notification-dropdown";
import ProfileDropdown from "../dropdown/profile-dropdown";
import _ from "lodash";
import SearchUsersList from "../../features/search/search-users-list";

const Header = (): ReactElement => {
  const ref = useRef();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState<boolean>(false);
  const { notificationBadge } = useUserData() as any;
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchDropdown, setSearchDropdown] = useState<boolean>(false);

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
            onFocus={() => setSearchDropdown(true)}
            onBlur={() => setSearchDropdown(false)}
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="h-full w-full rounded-xl border   border-transparent bg-slate-100 pl-8 text-sm outline-none placeholder:text-xs placeholder:font-light hover:border-slate-300 hover:bg-white focus:border-color-main focus:bg-white focus:shadow-md focus:hover:border-color-main-light "
            placeholder="Search for @someone..."
          />
          <div className="absolute left-2 top-[50%] z-0 translate-y-[-50%] text-gray-400">
            <IoSearchOutline fontSize={20} />
          </div>

          {searchDropdown && (
            // <div className="absolute top-[110%] h-auto  w-full rounded-lg  border bg-white shadow-md">
            // {searchKey && (
            //   <div className="flex h-10 items-center px-2">
            //     <div className="flex items-center">
            //       <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-color-main text-white">
            //         <IoSearch />
            //       </div>
            //       <p className="text-sm font-light text-text-main">
            //         Search for <b>{searchKey}</b>
            //       </p>
            //     </div>
            //   </div>
            // )}
            // </div>
            <SearchUsersList searchKey={searchKey} />
          )}
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
          {notificationBadge > 0 && (
            <div className="absolute top-[-2px] right-[-2px] flex h-5 w-6 items-center justify-center rounded-full border-2  border-white bg-red-500 text-xs font-semibold text-white">
              {notificationBadge > 9 ? "9+" : notificationBadge}
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
            showStatus={true}
          />
        </div>
      </div>

      {isNotificationOpen && <NotificationDropdown ref={ref} />}
      {isSignOutOpen && <ProfileDropdown />}
    </header>
  );
};

export default Header;
