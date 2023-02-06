import { ReactElement, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { ReactChildrenProps, UserLoggedInProps } from "../../interface";

const ProfileAvatar = ({
  w,
  h,
  ts,
}: {
  w?: string;
  h?: string;
  ts?: string;
}): ReactElement => {
  const { user } = useUserData() as { user: UserLoggedInProps };
  const profileColor: string = user?.profile?.profile_color;
  const initials: string = user?.profile?.initials;
  const profilePhoto: string = user?.profile?.profile_photo;

  return (
    <div
      className={`mr-2 flex ${h ? h : "h-9"} ${
        w ? w : "w-9"
      } items-center justify-center rounded-full ${profileColor} cursor-pointer`}
    >
      {!profilePhoto ? (
        <p className={`font-semibold text-white ${ts && ts}`}>{initials}</p>
      ) : (
        <img src="/" alt="Avatar" />
      )}
    </div>
  );
};

export default ProfileAvatar;
