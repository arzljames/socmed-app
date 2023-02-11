import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import TextHeading from "../components/Custom/Text/TextHeading";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import Sidebar from "../components/Home/Sidebar";

const Messages: NextPage = () => {
  return (
    <div className="h-full">
      <Head>
        <title>Chat Messages | CreatVe</title>
      </Head>
      <div className="flex  flex-col items-start justify-start bg-slate-100">
        <div className="flex h-screen w-full flex-col ">
          <div className="sticky top-0 z-10 h-auto w-full ">
            <Header />
            <Navbar />
          </div>
          <div className="flex h-full w-full flex-1 overflow-hidden px-3  md:px-[10%]">
            <Sidebar />
            <div className="flex h-full w-72 flex-col items-start justify-start overflow-y-auto border-l bg-transparent pt-5  scrollbar-thin md:ml-1  ">
              <div className="flex h-full w-full flex-col  ">
                <div className="sticky top-0 flex w-full  flex-col bg-slate-100 px-3  pb-2">
                  <TextHeading>Chats</TextHeading>
                  <input
                    type="search"
                    placeholder="Search Messages"
                    className="mt-2 h-9 w-full rounded-full  px-3 text-sm font-light text-text-main outline-none placeholder:text-sm"
                  />
                </div>
                <div className="h-full w-full flex-1 px-3 pb-5 ">
                  <div className="h-full w-full overflow-y-scroll rounded-xl p-2 scrollbar-none"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 py-5">
              <div className="h-full w-full rounded-xl bg-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

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
  }

  return {
    props: {},
  };
};
