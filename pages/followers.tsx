import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";

const Friends: NextPage = ({ data }: any) => {
  return (
    <div>
      <Head>
        <title>Friends | CreatVe</title>
      </Head>
    </div>
  );
};

export default Friends;
