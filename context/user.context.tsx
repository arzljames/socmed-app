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
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState<string>("");

  return (
    <UserDataContext.Provider
      value={{ user, setUser, posts, setPosts, token, setToken }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
