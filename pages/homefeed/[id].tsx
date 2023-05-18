import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { getPostById } from "../../utils/api/api";
import { SessionProps } from "../../interface";
import FeedID from "../../components/card/feed-id";

const FeedById = ({ post }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Post | CreatVe</title>
      </Head>

      <div className="w-full overflow-y-scroll px-5 pt-5 md:w-[55%]">
        <FeedID data={post[0]} />
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
