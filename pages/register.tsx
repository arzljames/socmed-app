import { NextPage } from "next";

import LoginHeader from "../components/Login/LoginHeader";
import Head from "next/head";
import RegisterForm from "../components/Register/RegisterForm";

const register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up | CreatVe</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-tr from-color-main to-color-main-2">
        <LoginHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-3 py-10 pb-10">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default register;
