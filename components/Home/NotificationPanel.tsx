import { ReactElement, useState, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import TextHeading from "../Custom/Text/TextHeading";
import TextSubHeadingMed from "../Custom/Text/TextSubHeadingMed";
import _ from "lodash";
import ReactTimeAgo from "react-time-ago";
import useNotificationDate from "../../hooks/useNotificationDate";
import OtherProfileAvatar from "./OtherProfileAvatar";
import Link from "next/link";

const NotificationPanel = ({ ref }: any): JSX.Element => {
  const { notifications } = useUserData() as any;
  const [groupNotif, setGroupNotif] = useState(null);

  useEffect(() => {
    // this gives an object with dates as keys
    const groups = notifications?.data?.reduce((groups: any, data: any) => {
      const date = data.createdAt.split("T")[0];
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
            date: useNotificationDate(date),
            data: groups[date],
          };
        })
    );
  }, [notifications]);

  return (
    <div
      ref={ref}
      className="absolute top-[100%] right-0  h-[85vh] w-full select-none overflow-y-scroll border bg-white shadow-xl scrollbar-none  md:right-[13%] md:top-[64px] md:max-w-sm md:rounded-lg"
    >
      <div className="sticky top-0 flex h-12 w-full items-center justify-between bg-white px-3">
        <TextHeading>Notifications</TextHeading>
        <p className="cursor-pointer text-xs font-medium text-color-main hover:underline">
          Mark all as read
        </p>
      </div>
      <div className="p-3">
        {_.map(groupNotif, (item, key) => {
          return (
            <div key={key} className="mb-4">
              <div className="mb-2">
                <TextSubHeadingMed>{item.date}</TextSubHeadingMed>
              </div>
              {_.map(item.data, (data, index) => {
                return (
                  <Link
                    href={`/homefeed/${data._id}`}
                    key={index}
                    className={`relative flex w-full items-center rounded-lg ${
                      data.status === "UNREAD" &&
                      "border bg-slate-100 font-semibold"
                    } mb-2 min-h-[75px] cursor-pointer p-2`}
                  >
                    <div className="relative mr-1">
                      <OtherProfileAvatar
                        ts="text-xl"
                        w="w-11"
                        h="h-11"
                        initials={data?.notify_by?.profile.initials}
                        profile_color={data?.notify_by?.profile.profile_color}
                      />

                      <div className="absolute bottom-[-10px] right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                        {data.reaction_icon}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 pr-2 text-sm text-text-main">
                        {data.notification}
                      </p>
                      <p className="text-xs font-normal text-color-main-dark">
                        <ReactTimeAgo
                          date={new Date(data?.createdAt)}
                          locale="en-US"
                          timeStyle="round-minute"
                        />
                      </p>
                    </div>

                    {data.status === "UNREAD" && (
                      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-color-main"></div>
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
