import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import ProfileCard from "../components/Home/ProfileCard";
import Sidebar from "../components/Home/Sidebar";
import WritePost from "../components/Home/WritePost";
import Feed from "../components/Home/Feed";
import { getSession } from "next-auth/react";
import { AuthenticationRoute } from "../utils/AuthenticationRoute";
import {
  SessionProps,
  SetUserLoggedInProps,
  UserLoggedInProps,
} from "../interface";
import { GET, PUT } from "../api/api";
import { AxiosResponse } from "axios";
import useUserData from "../hooks/useUserData";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Error from "next/error";
import useRefreshData from "../hooks/useRefreshData";
import { useRouter } from "next/router";

const Home: NextPage = ({ data }: AxiosResponse) => {
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const { user }: { user: UserLoggedInProps } = data;
  const { setUser } = useUserData() as SetUserLoggedInProps;
  const [isNewUser, setIsNewUser] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setUser(user);
    setIsNewUser(user.is_new_user);
  }, []);

  const handleUpdateUser = async () => {
    try {
      const res = await PUT("/api/user/new-user/", user.access_token);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsNewUser(false);
      useRefreshData(router);
    }
  };

  return (
    <>
      <Head>
        <title>Home Feed | CreatVe</title>
      </Head>

      <div
        className="flex h-screen min-h-screen
       w-screen flex-col items-start justify-start bg-slate-100 md:w-full md:flex-col"
      >
        <div className="sticky top-0 z-10 h-auto w-full">
          <Header />
          <Navbar />
        </div>

        <div className="flex h-full w-full flex-1 overflow-hidden px-3  md:px-[10%]">
          <Sidebar />

          <div className="flex h-full w-full flex-1 flex-col items-start justify-start overflow-y-auto bg-transparent pt-5  scrollbar-thin md:ml-1 md:mr-3 ">
            <WritePost />
            {data.posts?.map((item: any) => {
              return <Feed data={item} />;
            })}
          </div>
          <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-4  lg:flex">
            <ProfileCard />
            <div className="relative w-full flex-1 overflow-y-scroll rounded-xl border bg-white px-3">
              <div className="sticky top-0 flex h-12 items-center  bg-white">
                <p className=" text-sm font-medium text-text-main">
                  You might know
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      {isNewUser && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-text-main bg-opacity-30 md:overflow-y-scroll md:py-10">
          <div className="div flex h-full w-full flex-col items-center justify-center bg-white p-7 shadow-lg md:h-auto md:min-h-[80%] md:w-[50%] md:rounded-lg">
            <div className="w-full">
              <img src="/welcome.svg" alt="welcome" className="object-cover" />
            </div>
            <div>
              <h1 className="mb-4 text-xl font-bold text-text-main">
                Welcome, Arzl James!
              </h1>
              <p className="mb-20 text-sm text-text-main">
                Welcome aboard to{" "}
                <span className="font-semibold text-color-main">Creat</span>
                <span className="font-semibold text-color-main-2">Ve</span>{" "}
                where you can create, interact, and view different stuffs
                online! Feel free to exlore our social media platform.
              </p>
              <div className="flex items-center justify-end">
                <button
                  onClick={handleUpdateUser}
                  className="flex items-center rounded-md border border-color-main-dark p-2 font-medium text-color-main-dark duration-100 ease-in-out hover:bg-color-main hover:text-white"
                >
                  Proceed <HiOutlineArrowNarrowRight className="ml-2 text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) return AuthenticationRoute();

  const { _id, access_token } = session?.user as SessionProps;

  try {
    const user = await GET("/api/user", access_token);
    const post = await GET("/api/post", access_token);

    return {
      props: {
        data: { user: { ...user.data, access_token }, posts: [...post.data] },
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      },
    };
  }
};
