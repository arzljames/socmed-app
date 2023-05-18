import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CHAT_STATUS } from "../../const";
import useToast from "../../hooks/useToast";
import useUserData from "../../hooks/useUserData";
import { UserProps } from "../../interface";
import { updateUserStatus } from "../../utils/api/api";
import { socket } from "../../utils/socket";
import CancelBtn from "../button/cancel-btn";
import PrimaryBtn from "../button/primary-btn";
import TextHeading from "../Custom/Text/TextHeading";

const AvailabilityModal = ({
  setIsOverlay,
}: {
  setIsOverlay?: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const { user, status, setStatus, token } = useUserData() as {
    user: UserProps;
    status: string;
    token: string;
    setStatus: any;
  };
  const [currStatus, setCurrStatus] = useState<string>("");

  useEffect(() => {
    if (!status || status.toLowerCase() === "offline") {
      setCurrStatus("Busy");
      return;
    }

    setCurrStatus(status);
  }, []);

  const handleUpdateStatus = async () => {
    const res = await updateUserStatus(token, { status: currStatus });
    if (res) setStatus(currStatus);
    setIsOverlay(false);
    useToast({
      message: `Changed active status to ${currStatus}`,
      state: "success",
    });
    return res;
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white px-3 shadow-md md:w-1/3 md:px-4"
    >
      <div className="flex h-16 items-center justify-center border-b ">
        <TextHeading>Active Status</TextHeading>
      </div>
      <ul className="py-3 md:py-4">
        {CHAT_STATUS.map((item: { status: string; color: string }) => {
          return (
            <li
              onClick={() => setCurrStatus(item.status)}
              key={item.status}
              className={`flex cursor-pointer items-center rounded-lg p-2  py-3 ${
                item.status === currStatus && " bg-slate-100"
              } mb-1 duration-75 ease-in-out `}
            >
              <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-400">
                {item.status === currStatus && (
                  <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                )}
              </div>
              <p
                className={`text-sm ${
                  item.status === currStatus
                    ? " font-medium text-text-main"
                    : "text-text-sub"
                }`}
              >
                {item.status}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end py-3 md:py-4">
        <CancelBtn clickEvent={() => setIsOverlay(false)}>Cancel</CancelBtn>
        <PrimaryBtn clickEvent={handleUpdateStatus}>Save</PrimaryBtn>
      </div>
    </div>
  );
};

export default AvailabilityModal;
