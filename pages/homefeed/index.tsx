import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import useUserData from "../../hooks/useUserData";
import _ from "lodash";
import { getSession } from "next-auth/react";
import { getPosts } from "../../utils/api/api";
import { SessionProps } from "../../interface";
import FeedList from "../../features/feed/feed-list";
import Head from "next/head";
import WritePost from "../../features/feed/write-post";
import WelcomeModal from "../../components/modal/welcome";
import ProfileCard from "../../components/card/profile-card";
import PeopleYouMightKnow from "../../components/card/you-might-know";

const HomeFeed = ({ data }: any): JSX.Element => {
  const { user, people, isLoading } = useUserData() as any;
  const [isNewUser, setIsNewUser] = useState<boolean>(user?.is_new_user);
  const [posts, setPosts] = useState([]);
  return (
    <>
      <Head>
        <title>CreatVe</title>
      </Head>
      <div
        id="scrollable"
        className="mr-1 flex h-full w-full flex-1 flex-col items-center justify-start overflow-y-auto bg-transparent pr-1 pt-3 md:mr-2 md:pr-2  md:pl-5 md:pt-5"
      >
        <WritePost />
        <FeedList data={data} />
      </div>
      <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-4  lg:flex">
        <ProfileCard />
        <PeopleYouMightKnow listUsers={people} />
      </div>

      {!posts && (
        <div className="my-10 flex flex-col items-center justify-center">
          <img className="w-60" src="/empty.svg" alt="empty" />
          <p className="text-center text-sm font-light text-text-sub">
            It's empty. Nothing to show from your feed
          </p>
        </div>
      )}

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
    const { access_token } = session?.user as SessionProps;
    const data = await getPosts(access_token, 10);
    return {
      props: { data },
    };
  }
};
