import { ReactElement, useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { ProfileAvatarProps, UserProps } from "../../interface";

const ProfileHeaderAvatar = ({
  setIsNotificationOpen,
  setIsSignOutOpen,
  isSignOutOpen,
}: ProfileAvatarProps): ReactElement => {
  const { user } = useUserData() as { user: UserProps };
  const profileColor: string = user?.profile?.profile_color;
  const initials: string = user?.profile?.initials;
  const profilePhoto: string = user?.profile?.profile_photo;

  const handleDropDown = () => {
    setIsNotificationOpen(false);
    setIsSignOutOpen(!isSignOutOpen);
  };

  return (
    <div
      onClick={handleDropDown}
      className={`mr-2 flex
  h-8 w-8 cursor-pointer items-center justify-center rounded-full ${profileColor} ${
        isSignOutOpen &&
        "after:absolute after:h-[30px] after:w-[30px] after:rounded-full   after:border-[2px] after:border-white after:content-['']"
      } select-none border-gray-500`}
    >
      {!profilePhoto ? (
        <p className={"font-semibold text-white"}>{initials}</p>
      ) : (
        <img src="/" alt="Avatar" />
      )}
    </div>
  );
};

export default ProfileHeaderAvatar;
