import { ReactNode, MutableRefObject, Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

export interface ReactChildrenProps {
  children: ReactNode;
}

export interface NavProps {
  name: string;
  iconActive: IconType;
  iconInactive: IconType;
  path: string;
}

export interface RefProps {
  ref: MutableRefObject<undefined | null | any>;
}

export interface IsCommentingProps {
  setIsCommenting: Dispatch<SetStateAction<Boolean>>;
}

export interface SessionProps {
  _id: string;
  access_token: string;
}

export interface UserLoggedInProps {
  _id: string;
  email: string;
  username: string;
  is_verified: boolean;
  status: string;
  is_new_user: boolean;
  created_at: Date | null;
  updated_at: Date | null;
  access_token: string;
  profile: UserProfileLoggedInProps;
}

export interface UserProfileLoggedInProps {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  initials: string;
  profile_color: string;
  profile_photo?: ProfilePhoto;
  cover_photo?: CoverPhoto;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface ProfilePhoto {
  path: string;
  filename: string;
}

export interface CoverPhoto {
  path: string;
  filename: string;
}

export interface SetUserLoggedInProps {
  setUser: Dispatch<SetStateAction<UserLoggedInProps>>;
}

export interface ProfileAvatarProps {
  setIsNotificationOpen?: Dispatch<SetStateAction<Boolean>>;
  setIsSignOutOpen?: Dispatch<SetStateAction<Boolean>>;
  isSignOutOpen?: Boolean;
}

export interface LoginPayloadProps {
  username: string;
  password: string;
}

export interface AccountRegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password?: string;
}

export interface RegisterValidationErrors {
  fname_error: boolean;
  fname_error_msg: string;
  lname_error: boolean;
  lname_error_msg: string;
  email_error: boolean;
  email_error_msg: string;
  username_error: boolean;
  username_error_msg: string;
  password_error: boolean;
  password_error_msg: string;
  confirm_password_error?: boolean;
  confirm_password_error_msg?: string;
}
