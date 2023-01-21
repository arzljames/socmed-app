import LoginHeader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import Head from "next/head";
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { PublicRoute } from "../utils/PublicRoute";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | CreatVe</title>
      </Head>
      <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-tr from-color-main to-color-main-2">
        <LoginHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-3 py-10 pb-10">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) return PublicRoute();

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };
};
