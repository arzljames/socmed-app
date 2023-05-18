import { ReactElement, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { UserProps } from "../../interface";

const OwnAvatar = ({
  w = "w-9",
  h = "h-9",
  ts,
  mr = "mr-2",
  showStatus = false,
}: {
  w?: string;
  h?: string;
  ts?: string;
  mr?: string;
  showStatus?: boolean;
}): ReactElement => {
  const { user, status } = useUserData() as { user: UserProps; status: string };
  const profileColor: string = user?.profile?.profile_color;
  const initials: string = user?.profile?.initials;
  const profilePhoto: string = user?.profile?.profile_photo;

  return (
    <div
      className={`${mr} flex ${h} ${w} relative select-none items-center justify-center rounded-full ${profileColor} z-10 cursor-pointer`}
    >
      {!profilePhoto ? (
        <p className={`font-semibold text-white ${ts && ts}`}>{initials}</p>
      ) : (
        <img src="/" alt="Avatar" />
      )}

      {showStatus && (
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            status?.toLowerCase() === "online"
              ? "bg-green-500"
              : "bg-orange-400"
          }`}
        ></div>
      )}
    </div>
  );
};

export default OwnAvatar;
