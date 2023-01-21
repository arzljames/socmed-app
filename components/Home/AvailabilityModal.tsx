import { ReactElement, useEffect, useState } from "react";
import { CHAT_STATUS } from "../../const";
import useUserData from "../../hooks/useUserData";
import TextHeading from "../Custom/Text/TextHeading";

const AvailabilityModal = (): ReactElement => {
  const { user } = useUserData() as any;
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (
      user.status !== "Online" ||
      user.status !== "Offline" ||
      user.status !== "Busy"
    ) {
      setStatus("Offline");
      return;
    }
    setStatus(user.status);
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white p-5 shadow-md md:w-1/3"
    >
      <div className="mb-3">
        <TextHeading>Set status</TextHeading>
      </div>
      <ul className="mb-3">
        {CHAT_STATUS.map((item: { status: string; color: string }) => {
          return (
            <li
              onClick={() => setStatus(item.status)}
              key={item.status}
              className={`flex cursor-pointer items-center rounded-lg border  p-2 ${
                item.status === status
                  ? "border-color-border "
                  : "border-white "
              } mb-1 duration-75 ease-in-out `}
            >
              <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-400">
                {item.status === status && (
                  <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                )}
              </div>
              <p className="text-sm text-text-sub"> {item.status}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AvailabilityModal;
