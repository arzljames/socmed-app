import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import RegisterForm from "../components/form/register-form";

const register: NextPage = () => {
  const today: Date = new Date();
  return (
    <>
      <Head>
        <title>Sign up | CreatVe</title>
      </Head>
      <div className="flex  h-screen w-full overflow-hidden ">
        <div className=" hidden h-full w-full items-center justify-center bg-white md:flex md:w-[60%]">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/cover.jpg"
              className="h-full w-full object-cover object-center"
              alt="cover"
            />

            <div className="absolute right-5 bottom-5 rounded-full bg-white bg-opacity-10 py-1 px-4 backdrop:blur-sm">
              <p className="text-sm font-light tracking-wide text-[#ffffffd3]">
                © CreatVe {today.getFullYear()}
              </p>
            </div>
          </div>
        </div>

        <RegisterForm />
      </div>
    </>
  );
};

export default register;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
};
