import { ReactElement } from "react";

const OtherProfileAvatar = ({
  w,
  h,
  ts,
  initials,
  profile_picture,
  profile_color,
}: {
  w?: string;
  h?: string;
  ts?: string;
  initials?: string;
  profile_picture?: string;
  profile_color?: string;
}): ReactElement => {
  return (
    <div
      className={`mr-2 flex ${h ? h : "h-9"} ${
        w ? w : "w-9"
      } items-center justify-center rounded-full ${profile_color} cursor-pointer`}
    >
      {!profile_picture ? (
        <p className={`font-semibold text-white ${ts && ts}`}>{initials}</p>
      ) : (
        <img src="/" alt="Avatar" />
      )}
    </div>
  );
};

export default OtherProfileAvatar;
