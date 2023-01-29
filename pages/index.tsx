import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return <></>;
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/homefeed",
        permanent: false,
      },
    };
  }
};
