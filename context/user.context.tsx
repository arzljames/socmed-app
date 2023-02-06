import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import {
  CoverPhoto,
  ProfilePhoto,
  ReactChildrenProps,
  UserLoggedInProps,
  UserProfileLoggedInProps,
} from "../interface";

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }: ReactChildrenProps) => {
  const [user, setUser] = useState<UserLoggedInProps>({
    _id: "",
    email: "",
    username: "",
    is_verified: false,
    status: "",
    is_new_user: false,
    createdAt: null,
    updatedAt: null,
    access_token: "",
    profile: {
      _id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      initials: "",
      profile_color: "",
      profile_photo: {
        path: "",
        filename: "",
      } as ProfilePhoto,
      cover_photo: {
        path: "",
        filename: "",
      } as CoverPhoto,
      created_at: null,
      updated_at: null,
    } as UserProfileLoggedInProps,
  });

  const [token, setToken] = useState<string>("");
  const [attachmentWarning, setAttachmentWarning] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([]);
  const [posts, setPosts] = useState([]);

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        setNotifications,
        notifications,
        token,
        setToken,
        setAttachmentWarning,
        attachmentWarning,
        posts,
        setPosts,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
