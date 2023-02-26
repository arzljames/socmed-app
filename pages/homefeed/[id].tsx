import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Sidebar from "../../features/sidebar";
import { getPostById } from "../../utils/api/api";
import Feed from "../../components/Home/Feed";
import { SessionProps } from "../../interface";

const FeedById = ({ post }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Post | CreatVe</title>
      </Head>
      <div
        className="flex h-screen min-h-screen
       w-screen flex-col items-start justify-start bg-slate-100 md:w-full md:flex-col"
      >
        <div className="flex h-full w-full flex-1 overflow-hidden px-3  md:px-[10%]">
          <Sidebar />
          <div className="flex h-full w-full flex-1 flex-col items-center justify-start overflow-y-auto bg-transparent pt-5  scrollbar-thin md:ml-1 md:mr-3 ">
            <Feed data={post[0]} />
          </div>
          <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-4  lg:flex"></div>
        </div>
      </div>
    </>
  );
};

export default FeedById;

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
    const { id } = context.params as { id: string };
    try {
      const res = await getPostById(access_token, id);
      return {
        props: {
          post: res,
        },
      };
    } catch (error) {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
};
