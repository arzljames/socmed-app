import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import Sidebar from "../components/Home/Sidebar";

const Friends: NextPage = ({ data }: any) => {
  return (
    <div>
      <Head>
        <title>Friends | CreatVe</title>
      </Head>
      <div className="flex min-h-screen w-screen flex-col items-start justify-start bg-gray-100">
        <div className="h-full w-full flex-1">
          <div className="sticky top-0 z-10 h-auto w-full">
            <Header />
            <Navbar />
          </div>
          <div className="flex h-full w-full flex-1 overflow-hidden">
            <Sidebar />

            <div className="flex h-full w-full flex-1 flex-col items-start justify-start overflow-y-auto bg-transparent px-3 py-3 scrollbar-thin md:py-8 lg:px-8"></div>
          </div>
          {data?.data}
        </div>
      </div>
    </div>
  );
};

export default Friends;
