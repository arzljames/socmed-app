import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";

const Groups: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Groups | SocMed</title>
      </Head>

      <div className="flex min-h-screen w-screen flex-col items-start justify-start bg-gray-100">
        <div className="h-full w-full flex-1">
          <div className="sticky top-0">
            <Header />
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
