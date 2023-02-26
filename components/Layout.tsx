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
import _ from "lodash";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { ROUTES } from "../const";
import useRefreshData from "../hooks/useRefreshData";
import Navbar from "./navigation/navbar";
import Sidebar from "./navigation/sidebar";
import Header from "../features/header";

const Layout = ({ children }: ReactChildrenProps) => {
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
    setIsLoading,
    posts,
    isFetching,
    setIsFetching,
  } = useUserData() as {
    setUser: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setPeople: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setPosts: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setToken: Dispatch<SetStateAction<string>>;
    setAttachmentWarning: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setNotifications: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    attachmentWarning: boolean;
    posts: any;
    isFetching: boolean;
    setIsFetching: Dispatch<SetStateAction<boolean>>;
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

  const fetchPosts = async (token: string): Promise<void> => {
    const res = await getPosts(token, 10);
    setPosts(res);
    return;
  };

  useEffect(() => {
    if (session) {
      const { access_token } = session?.user as SessionProps;
      setToken(access_token);
      fetchUser(access_token);
      fetchNotifications(access_token);
      fetchUsersRecommendation(access_token);
      fetchPosts(access_token);
    }

    if (!isAttachmentWarning) {
      localStorage.setItem("attachment_warning", "true");
    } else {
      const warning: boolean =
        localStorage.getItem("attachment_warning") === "true" ? true : false;
      setAttachmentWarning(warning);
    }
  }, [session, isFetching]);

  useEffect(() => {
    if (!posts?.data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    socket.on("server:refresh_data", () => {
      setIsFetching(true);
      useRefreshData(router);
    });

    setTimeout(() => setIsFetching(false), 500);
  }, []);

  const router = useRouter();
  const path = router.asPath;
  return (
    <main className="mx-auto flex h-screen min-h-[100svh] w-full max-w-[1500px] flex-col items-start justify-start overflow-y-hidden md:min-h-[100dvh]">
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 5000,
          },
        }}
      />
      <div className="sticky top-0 z-10 h-auto w-full">
        {!_.includes([ROUTES.LOGIN, ROUTES.REGISTER], path) && <Header />}
        {!_.includes([ROUTES.LOGIN, ROUTES.REGISTER], path) && <Navbar />}
      </div>
      <div
        className={`flex h-full w-full flex-1 overflow-hidden   ${
          !_.includes([ROUTES.LOGIN, ROUTES.REGISTER], path) &&
          "pl-3 pr-0 md:px-[10%]"
        }`}
      >
        {!_.includes([ROUTES.LOGIN, ROUTES.REGISTER], path) && <Sidebar />}
        {children}
      </div>
    </main>
  );
};

export default Layout;
