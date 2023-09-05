import { useSession } from "next-auth/react";
import useUserData from "../hooks/useUserData";
import useRefreshData from "../hooks/useRefreshData";
import { ReactChildrenProps, SessionProps, UserProps } from "../interface";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  getNotifications,
  getPosts,
  getUser,
  getUsersRecommendation,
  getUserStatus,
} from "../utils/api/api";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { ROUTES } from "../const";
import Navbar from "./navigation/navbar";
import Sidebar from "./navigation/sidebar";
import Header from "./header/header";
import { socket } from "../utils/socket";

const Layout = ({ children }: ReactChildrenProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const path = router.asPath;
  const isAttachmentWarning =
    typeof window !== "undefined"
      ? localStorage.getItem("attachment_warning")
      : null;
  const {
    setUser,
    user,
    setPeople,
    setPosts,
    setToken,
    setAttachmentWarning,
    isLoading,
    setIsLoading,
    posts,
    setIsFetching,
    setStatus,
    status,
    setNotificationBadge,
    setPostCount,
  } = useUserData() as {
    setUser: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    user: UserProps;
    setPeople: Dispatch<SetStateAction<AxiosResponse<any, any>>>;
    setPosts: any;
    setToken: Dispatch<SetStateAction<string>>;
    token: string;
    setAttachmentWarning: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    attachmentWarning: boolean;
    posts: any;
    isLoading: boolean;
    setIsFetching: Dispatch<SetStateAction<boolean>>;
    setStatus: Dispatch<SetStateAction<string>>;
    status: string;
    setNotificationBadge: Dispatch<SetStateAction<number>>;
    setPostCount: Dispatch<SetStateAction<number>>;
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

  const fetchPosts = async (token: string): Promise<void> => {
    if (!_.isEmpty(posts?.data)) {
      const skip = posts?.data?.length < 11 ? 10 : posts?.data?.length;
      const res = await getPosts(token, skip);
      setPosts(res);
      return;
    } else {
      const res = await getPosts(token, 10);
      setPosts(res);
      return;
    }
  };

  const fetchPostCount = async (token: string): Promise<void> => {
    const res = await getPosts(token, 99999);
    const count = _.filter(res?.data, (item: any) => {
      return item.author._id === user._id;
    }).length;
    setPostCount(count);
    return;
  };

  const fetchUserStatus = async (token: string): Promise<void> => {
    const res = await getUserStatus(token);
    setStatus(res);
    return;
  };

  const fetchNotificationsBadge = async (
    access_token: string
  ): Promise<void> => {
    const res = await getNotifications(access_token);
    if (res?.meta?.total_unread) setNotificationBadge(res.meta.total_unread);
    return;
  };

  useEffect(() => {
    if (session) {
      const { access_token } = session?.user as SessionProps;
      setToken(access_token);
      fetchUser(access_token);
      fetchNotificationsBadge(access_token);
      fetchUsersRecommendation(access_token);
      fetchPosts(access_token);
      fetchUserStatus(access_token);
      fetchPostCount(access_token);
    }

    if (!isAttachmentWarning) {
      localStorage.setItem("attachment_warning", "true");
    } else {
      const warning: boolean =
        localStorage.getItem("attachment_warning") === "true" ? true : false;
      setAttachmentWarning(warning);
    }
  }, [session, isLoading, status, router]);

  useEffect(() => {
    if (!posts?.data) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
    const timer = setTimeout(() => setIsFetching(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    socket.on("server:refresh_data", () => {
      setIsLoading(true);
       useRefreshData(router);
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    });
  }, [socket]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("active_status", user._id);
    }
    socket.on("get_status", async (data) => {
      if (data) {
        setStatus(data);
      }
    });
  }, [user]);

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
      <div className="sticky top-0 z-10 h-auto w-full ">
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
