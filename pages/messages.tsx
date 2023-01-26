import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import Sidebar from "../components/Home/Sidebar";
import MessageChat from "../components/Message/MessageChat";

const Messages: NextPage = () => {
  return (
    <div className="h-full">
      <Head>
        <title>Chat Messages | CreatVe</title>
      </Head>
      <div className="flex  flex-col items-start justify-start bg-gray-100">
        <div className="flex h-screen w-full flex-col ">
          <div className="sticky top-0 z-10 h-auto w-full ">
            <Header />
            <Navbar />
          </div>
          <div className="flex h-full w-full flex-1 overflow-hidden px-3  md:px-[10%]">
            <Sidebar />
            <div className="flex h-full w-full flex-1 flex-col items-start justify-start overflow-y-auto bg-transparent py-5  scrollbar-thin md:ml-1 md:mr-3 ">
              {/* <MessageChat /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
