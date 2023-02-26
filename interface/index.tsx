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
  _id?: string;
  access_token: string;
}

export interface CreateNotificationProps {
  notification_type: string;
  notification: string;
  notify_to: string;
  notify_by: string;
  link: string;
  reaction_icon?: string;
  post_id?: string;
}

export interface UserProps {
  _id: string;
  username: string;
  email: string;
  is_new_user: boolean;
  is_verified: boolean;
  status: string;
  profile: UserProfileProps;
  followers: any[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface FriendList {
  email: string;
  friend_status: number;
  is_new_user: boolean;
  is_vertified: boolean;
  profile: UserProps;
  status: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  username: string;
  _id: string;
}

export interface UserProfileProps {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  initials: string;
  profile_color: string;
  profile_photo?: string;
  cover_photo?: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface SetUserLoggedInProps {
  setUser: Dispatch<SetStateAction<UserProps>>;
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
