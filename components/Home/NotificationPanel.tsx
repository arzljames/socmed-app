import { useState, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import TextHeading from "../Custom/Text/TextHeading";
import _ from "lodash";
import ReactTimeAgo from "react-time-ago";
import useNotificationDate from "../../hooks/useNotificationDate";
import OtherProfileAvatar from "./OtherProfileAvatar";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { markNotificationRead } from "../../utils/api/api";
import Link from "next/link";

const NotificationPanel = ({ ref }: any): JSX.Element => {
  const { notifications, token } = useUserData() as any;
  const [groupNotif, setGroupNotif] = useState(null);

  useEffect(() => {
    // this gives an object with dates as keys
    const groups = notifications?.data?.reduce((groups: any, data: any) => {
      const date = useNotificationDate(data.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(data);
      return groups;
    }, {});

    setGroupNotif(
      groups &&
        Object.keys(groups).map((date) => {
          return {
            date: date,
            data: groups[date],
          };
        })
    );
  }, [notifications]);

  const handleMarkNotificationRead = async (id: string, status: string) => {
    if (status !== "UNREAD") return;
    await markNotificationRead(token, id);
  };

  return (
    <div
      ref={ref}
      className="absolute top-[100%] right-0  h-[85vh] w-full select-none overflow-y-scroll border bg-white shadow-xl scrollbar-none  md:right-[13%] md:top-[64px] md:max-w-sm md:rounded-lg"
    >
      <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b bg-white px-3">
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
        <p className="flex cursor-pointer items-center text-xs font-medium text-color-main-dark hover:underline">
          Mark all as read <IoCheckmarkDoneSharp size={16} className="ml-1" />
        </p>
      </div>

      <div>
        {_.map(groupNotif, (item, key) => {
          return (
            <div key={key} className="py-3">
              <div>
                <p className="mb-2 px-3 text-xs font-semibold text-text-main">
                  {item.date}
                </p>
              </div>
              {_.map(item.data, (data, index) => {
                return (
                  <Link
                    href={{
                      pathname: "/homefeed/[post]",
                      query: { post: data._id },
                    }}
                    key={index}
                    onClick={() =>
                      handleMarkNotificationRead(data._id, data.status)
                    }
                    className={`relative flex min-h-[75px] w-full cursor-pointer items-center p-2 pr-3 pl-8  duration-75 ease-in-out ${
                      data.status === "UNREAD" && "bg-gray-100 font-medium"
                    } hover:bg-gray-100`}
                  >
                    <div className="relative mr-1">
                      <OtherProfileAvatar
                        ts="text-xl"
                        w="w-10"
                        h="h-10"
                        initials={data?.notify_by?.profile.initials}
                        profile_color={data?.notify_by?.profile.profile_color}
                      />

                      <div className="absolute bottom-[-8px] right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        {data.reaction_icon}
                      </div>
                    </div>
                    <div>
                      <h1
                        className={`text-sm text-text-main  ${
                          data.status === "UNREAD"
                            ? "font-bold"
                            : "font-semibold"
                        }`}
                      >
                        {data.notification_type}
                      </h1>
                      <p className="mb-2 pr-2 text-sm text-text-main ">
                        {data.notification}
                      </p>
                      <p className="text-xs  text-gray-400">
                        <ReactTimeAgo
                          date={new Date(data?.createdAt)}
                          locale="en-US"
                          timeStyle="round-minute"
                        />
                      </p>
                    </div>

                    {data.status === "UNREAD" && (
                      <div className="absolute top-[50%] left-4 h-[6px] w-[6px] translate-y-[-50%] rounded-full bg-blue-400"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPanel;
