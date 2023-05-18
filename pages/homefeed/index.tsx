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
import PromptModal from "../../components/modal/prompt-modal";

const HomeFeed = ({ data }: any): JSX.Element => {
  const { user, people } = useUserData() as any;
  const [isNewUser, setIsNewUser] = useState<boolean>(user?.is_new_user);
  const [promptModal, setPromptModal] = useState<boolean>(false);
  const [toFollow, setToFollow] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>CreatVe — Where Creativity Begins</title>
      </Head>
      <div
        id="scrollable"
        className="mr-1 flex h-full w-full flex-1 flex-col items-center justify-start overflow-y-auto bg-transparent pr-1 pt-3 md:mr-2 md:pr-2  md:pl-5 md:pt-5"
      >
        <WritePost />
        <FeedList />
      </div>
      <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-1  lg:flex">
        <ProfileCard data={data} />
        <PeopleYouMightKnow
          listUsers={people}
          setToFollow={setToFollow}
          setPromptModal={setPromptModal}
        />
      </div>

      {isNewUser && <WelcomeModal setIsNewUser={setIsNewUser} />}
      {/* {promptModal && (
        <PromptModal
          setPromptModal={setPromptModal}
          title="Follow User"
          message={`Are you sure you want to follow ${toFollow}?`}
          isLoading={isLoading}
          btnName="Submit"


        />
      )} */}
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
