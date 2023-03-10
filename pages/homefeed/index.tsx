import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../../components/Home/Header";
import Navbar from "../../components/Home/Navbar";
import ProfileCard from "../../components/Home/ProfileCard";
import Sidebar from "../../components/Home/Sidebar";
import WritePost from "../../components/Home/WritePost";
import Feed from "../../components/Home/Feed";
import useUserData from "../../hooks/useUserData";
import WelcomeModal from "../../components/Home/WelcomeModal";
import PeopleYouMightKnow from "../../components/Home/PeopleYouMightKnow";
import _ from "lodash";
import { getSession } from "next-auth/react";

const HomeFeed = (): JSX.Element => {
  const { user, posts, people } = useUserData() as any;
  const [isNewUser, setIsNewUser] = useState<boolean>(user?.is_new_user);

  return (
    <>
      <Head>
        <title>CreatVe</title>
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
          <div className="flex h-full w-full flex-1 flex-col items-center justify-start overflow-y-auto bg-transparent pt-5  scrollbar-thin md:ml-1 md:mr-3 ">
            <WritePost />
            {_.map(posts?.data, (item: any, index: number) => {
              return <Feed key={index} data={item} />;
            })}
            {_.isEmpty(posts) && (
              <div className="my-10 flex flex-col items-center justify-center">
                <img className="w-60" src="/empty.svg" alt="empty" />
                <p className="text-center text-sm font-light text-text-sub">
                  It's empty. Nothing to show from your feed
                </p>
              </div>
            )}
          </div>
          <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-4  lg:flex">
            <ProfileCard />
            <PeopleYouMightKnow listUsers={people} />
          </div>
        </div>
      </div>
      {isNewUser && <WelcomeModal setIsNewUser={setIsNewUser} />}
    </>
  );
};
export default HomeFeed;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
