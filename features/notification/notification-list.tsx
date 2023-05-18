import React, { ReactElement, useEffect, useState } from "react";
import OtherProfileAvatar from "../../components/avatar/user-avatar";
import _ from "lodash";
import useUserData from "../../hooks/useUserData";
import useNotificationDate from "../../hooks/useNotificationDate";
import { getNotifications } from "../../utils/api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationSkeletal from "../../components/skeletal/notification-skeletal";
import FormatTime from "../../utils/FormatTime";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { NextRouter, useRouter } from "next/router";
import NotificationOptionDropdown from "../../components/dropdown/notification-option-dropdown";

const NotificationList = ({
  handleMarkNotificationRead,
}: any): ReactElement => {
  const router: NextRouter = useRouter();
  const [dropdownKey, setDropdownKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { notifications, setNotifications, token, isFetching, isLoading } =
    useUserData() as any;
  const [groupNotif, setGroupNotif] = useState(null);

  const fetchNotifications = async (access_token: string): Promise<void> => {
    const res = await getNotifications(access_token);
    setNotifications(res);
    return;
  };

  // initially set notifications data
  useEffect(() => {
    fetchNotifications(token);
  }, [isLoading]);

  // triggers infinite-scroll if there's still item to fetch
  // false by default
  useEffect(() => {
    setHasMore(notifications?.meta?.page < notifications?.meta?.pages);
  }, [notifications?.meta]);

  const getMoreNotifications = async () => {
    const newNotification = await getNotifications(
      token,
      10,
      notifications?.data?.length
    );
    if (newNotification) {
      setNotifications({
        meta: newNotification?.meta,
        data: [...notifications?.data, ...newNotification?.data],
      });
    }
  };

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

  if (isFetching && _.isEmpty(notifications)) return <NotificationSkeletal />;

  if (_.isEmpty(notifications) && !isFetching) {
    return (
      <div className="absolute bottom-0 flex h-20 w-full flex-col items-center justify-center  pt-20">
        <p className="text-center text-sm font-light text-text-sub">
          No new notifications
        </p>
      </div>
    );
  }

  return (
    <div
      id="notification-scrollable"
      className="secondary-scroll h-full  w-full overflow-scroll rounded-b-lg px-2"
    >
      <InfiniteScroll
        dataLength={notifications.data?.length | 0}
        next={getMoreNotifications}
        hasMore={hasMore}
        loader={
          <div className="flex w-full flex-col items-center">
            <NotificationSkeletal />
          </div>
        }
        endMessage={
          <p className="mb-4 mt-4 flex h-10 items-center justify-center  text-sm font-light text-text-sub">
            No more data to show
          </p>
        }
        scrollableTarget="notification-scrollable"
      >
        {_.map(groupNotif, (item: any, key: number) => {
          return (
            <div key={key} className="py-3">
              <div>
                <p className="mb-2 px-3 text-xs font-semibold text-text-main">
                  {item.date}
                </p>
              </div>
              {_.map(item.data, (data: any, index: number) => {
                return (
                  <div
                    key={data._id}
                    onClick={() => {
                      handleMarkNotificationRead(data._id, data.status);
                      router.push({
                        pathname: "/homefeed/[post]",
                        query: { post: data._id },
                      });
                    }}
                    className={`relative mb-1 flex min-h-[75px] w-full cursor-pointer items-center rounded-xl p-2 pr-3 pl-4  duration-75 ease-in-out ${
                      data.status === "UNREAD" &&
                      "relative bg-gray-100 font-medium"
                    } hover:bg-gray-100`}
                  >
                    <div className="relative mr-2">
                      <OtherProfileAvatar
                        ts="text-xl"
                        w="w-10"
                        h="h-10"
                        initials={data?.notify_by?.profile.initials}
                        profile_color={data?.notify_by?.profile.profile_color}
                      />

                      <div className="notif-icon flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        {data.reaction_icon}
                      </div>
                    </div>
                    <div className="w-auto flex-1">
                      <p className="mb-2 text-sm text-text-main ">
                        {data.notification}
                      </p>
                      <div className="flex">
                        <p className="mr-1  text-xs text-gray-400">
                          {FormatTime(data.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownKey(data._id);
                      }}
                      className="notif-option-icon relative flex h-9 min-h-[40px] w-9 min-w-[40px] items-center justify-center rounded-full duration-75 ease-in-out hover:bg-white hover:shadow-md  "
                    >
                      <IoEllipsisHorizontalOutline className="text-text-sub" />
                      {dropdownKey === data._id && (
                        <NotificationOptionDropdown
                          id={data._id}
                          status={data.status}
                        />
                      )}
                    </div>

                    {data.status === "UNREAD" && (
                      <span className="unread-icon absolute rounded-full "></span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default NotificationList;
