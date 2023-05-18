import { AxiosResponse } from "axios";
import { createContext, useState } from "react";
import { ReactChildrenProps, UserProps } from "../interface";

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }: ReactChildrenProps) => {

  const [user, setUser] = useState<UserProps>({

    _id: "",
    email: "",
    username: "",
    is_verified: false,
    status: "",
    is_new_user: false,
    createdAt: null,
    updatedAt: null,
    profile: {
      _id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      initials: "",
      profile_color: "",

      profile_photo: "",
      cover_photo: "",
      createdAt: null,
      updatedAt: null,
    },
    followers: [],
  });

  const [token, setToken] = useState<string>("");
  const [attachmentWarning, setAttachmentWarning] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [posts, setPosts] = useState<any>({});
  const [people, setPeople] = useState<AxiosResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [status, setStatus] = useState<"Online" | "Offline" | "Busy" | "">("");
  const [notificationBadge, setNotificationBadge] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);

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
        people,
        setPeople,
        isLoading,
        setIsLoading,
        isFetching,
        setIsFetching,
        status,
        setStatus,
        notificationBadge,
        setNotificationBadge,
        postCount,
        setPostCount,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
