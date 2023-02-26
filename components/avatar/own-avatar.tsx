import { ReactElement, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { UserProps } from "../../interface";

const OwnAvatar = ({
  w,
  h,
  ts,
  mr,
}: {
  w?: string;
  h?: string;
  ts?: string;
  mr?: string;
}): ReactElement => {
  const { user } = useUserData() as { user: UserProps };
  const profileColor: string = user?.profile?.profile_color;
  const initials: string = user?.profile?.initials;
  const profilePhoto: string = user?.profile?.profile_photo;

  return (
    <div
      className={`${mr ? mr : "mr-2"} flex ${h ? h : "h-9"} ${
        w ? w : "w-9"
      } select-none items-center justify-center rounded-full ${profileColor} z-0 cursor-pointer`}
    >
      {!profilePhoto ? (
        <p className={`font-semibold text-white ${ts && ts}`}>{initials}</p>
      ) : (
        <img src="/" alt="Avatar" />
      )}
    </div>
  );
};

export default OwnAvatar;
