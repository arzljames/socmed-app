import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { getLoginUser, getPosts } from "../api/api";
import { AxiosResponse } from "axios";
import useUserData from "../hooks/useUserData";

const Home: NextPage = ({ data }: AxiosResponse) => {
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const { user }: { user: UserLoggedInProps } = data;
  const { setUser } = useUserData() as SetUserLoggedInProps;

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <>
      <Head>
        <title>Home Feed | SocMed</title>
      </Head>

      <div
        className="flex h-screen min-h-screen
       w-screen flex-col items-start justify-start bg-color-bg md:w-full md:flex-col"
      >
        <div className="sticky top-0 z-10 h-auto w-full">
          <Header />
          <Navbar />
        </div>

        <div className="flex h-full w-full flex-1 overflow-hidden">
          <Sidebar />

          <div className="flex h-full w-full flex-1 flex-col items-start justify-start overflow-y-auto bg-transparent px-3 py-3 scrollbar-thin md:py-8 lg:px-8">
            <WritePost />
            {data.posts?.map((item: any) => {
              return <Feed data={item} />;
            })}
          </div>
          <div className="sticky top-20 right-0  hidden  h-full w-72  items-start justify-start overflow-y-scroll px-3 py-8 lg:flex">
            <ProfileCard />
          </div>
        </div>
      </div>
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
    const user = await getLoginUser("/api/user", access_token);
    const post = await getPosts("/api/post", access_token);

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
