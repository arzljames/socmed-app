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
    friend_list: [],
  });

  const [token, setToken] = useState<string>("");
  const [attachmentWarning, setAttachmentWarning] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AxiosResponse[]>([]);
  const [posts, setPosts] = useState<AxiosResponse[]>([]);
  const [people, setPeople] = useState<AxiosResponse[]>([]);

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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
