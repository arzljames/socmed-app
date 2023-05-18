import { useState } from "react";
import useUserData from "../../hooks/useUserData";
import TextHeading from "../Custom/Text/TextHeading";
import _ from "lodash";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "../../utils/api/api";
import CustomLoader from "../Custom/Loader";
import NotificationList from "../../features/notification/notification-list";
import useToast from "../../hooks/useToast";

const NotificationDropdown = ({ ref }: any): JSX.Element => {
  const { notifications, token, setNotificationBadge } = useUserData() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMarkNotificationRead = async (id: string, status: string) => {
    if (status !== "UNREAD") return;
    await markNotificationRead(token, id);
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      setIsLoading(true);
      const res = await markAllNotificationsRead(token);
      if (res) setIsLoading(false);
      useToast({
        message: "Mark all notifications read",
        state: "success",
      });
      setNotificationBadge(0);
      return res;
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  return (
    <div
      ref={ref}
      id="notif"
      className="notif absolute top-[100%] right-0 z-50 h-[85vh] w-full select-none border bg-white shadow-xl  md:right-[13%] md:top-[62px] md:max-w-sm md:rounded-lg"
    >
      <div className="z-10 flex h-[11%] w-full items-center justify-between rounded-t-lg border-b bg-white px-3">
        <div className="flex items-center">
          <TextHeading>Notifications</TextHeading>
          {notifications?.meta?.total_unread > 0 && (
            <div className="ml-2 flex w-6 items-center justify-center rounded-lg bg-red-500 p-1 text-white">
              <p className="text-xs font-semibold">
                {notifications?.meta?.total_unread}
              </p>
            </div>
          )}
        </div>
        {!_.isEmpty(notifications?.data) && (
          <p
            onClick={handleMarkAllNotificationsRead}
            className="flex cursor-pointer items-center text-xs font-medium text-color-main-dark hover:underline"
          >
            Mark all as read
            <div className="ml-1">
              {isLoading ? (
                <CustomLoader w="18" h="18" c="#4575bf" m="ml-1" />
              ) : (
                <IoCheckmarkDoneSharp size={16} />
              )}
            </div>
          </p>
        )}
      </div>

      <div className="h-[89%] w-full">
        <NotificationList
          handleMarkNotificationRead={handleMarkNotificationRead}
        />
      </div>
    </div>
  );
};

export default NotificationDropdown;
