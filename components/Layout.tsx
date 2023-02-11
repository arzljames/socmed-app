import { useSession } from "next-auth/react";
import useUserData from "../hooks/useUserData";
import { ReactChildrenProps, SessionProps } from "../interface";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  getNotifications,
  getPosts,
  getUser,
  getUsersRecommendation,
} from "../utils/api/api";
import { AxiosResponse } from "axios";
import { socket } from "../utils/socket";
import useRefreshData from "../hooks/useRefreshData";
import { useRouter } from "next/router";
import _ from "lodash";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: ReactChildrenProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isAttachmentWarning =
    typeof window !== "undefined"
      ? localStorage.getItem("attachment_warning")
      : null;
  const {
    setUser,
    setPeople,
    setPosts,
    setToken,
    setNotifications,
    setAttachmentWarning,
  } = useUserData() as {
    setUser: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setPeople: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setPosts: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setToken: Dispatch<SetStateAction<string>>;
    attachmentWarning: boolean;
    setAttachmentWarning: Dispatch<SetStateAction<boolean>>;
    setNotifications: any;
  };

  const fetchUser = async (access_token: string): Promise<void> => {
    const res = await getUser(access_token);
    setUser(res);
    return;
  };

  const fetchUsersRecommendation = async (
    access_token: string
  ): Promise<void> => {
    const res = await getUsersRecommendation(access_token);
    setPeople(res);
    return;
  };

  const fetchNotifications = async (access_token: string): Promise<void> => {
    const res = await getNotifications(access_token);
    setNotifications(res);
    return;
  };

  const fetchPosts = async (access_token: string): Promise<void> => {
    const res = await getPosts(access_token);
    setPosts(res);
    return;
  };

  useEffect(() => {
    if (session) {
      const { access_token } = session?.user as SessionProps;
      setToken(access_token);
      fetchUser(access_token);
      fetchNotifications(access_token);
      fetchPosts(access_token);
      fetchUsersRecommendation(access_token);
    }

    if (!isAttachmentWarning) {
      localStorage.setItem("attachment_warning", "true");
    } else {
      const warning: boolean =
        localStorage.getItem("attachment_warning") === "true" ? true : false;
      setAttachmentWarning(warning);
    }
  }, [session, isAttachmentWarning, router]);

  useEffect(() => {
    socket.on("server:refresh_data", () => {
      useRefreshData(router);
    });
  }, [socket]);

  return (
    <main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 5000,
          },
        }}
      />
      {children}
    </main>
  );
};

export default Layout;
