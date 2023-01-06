import LoginHeader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import Head from "next/head";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | SocMed</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-[#EFEFEF]">
        <LoginHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-3 py-10 pb-10">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
