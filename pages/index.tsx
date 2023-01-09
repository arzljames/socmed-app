import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import ProfileCard from "../components/Home/ProfileCard";
import Sidebar from "../components/Home/Sidebar";
import WritePost from "../components/Home/WritePost";

const Home: NextPage = () => {
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  return (
    <div>
      <Head>
        <title>Home Feed | SocMed</title>
      </Head>

      <div className="flex min-h-screen w-screen flex-col items-start justify-start bg-color-bg md:w-full md:flex-col ">
        <div className="sticky top-0 z-10 h-auto w-full">
          <Header />
          <Navbar />
        </div>

        <div className="flex h-full w-full flex-1   px-3 pt-6 pb-0 md:px-4 ">
          <Sidebar />

          <div className="flex w-full flex-1 flex-col items-start justify-start overflow-y-auto bg-transparent pb-4 md:px-10 lg:px-14">
            <WritePost />
            <div className="mb-4 rounded-xl bg-white p-3 shadow-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
              digmpora error temporibus eaque vero optio nostrum suscipit, quam
              officia doloribus non. Culpa repellat consequuntur dicta illum
              blanditiis eos praesentium quasi qui dolores consectetur minus
              ipsa dolorem, ipsam, facilis quia expedita niet assumenda
              provident aliquid? Dolorum similique autem repudiandae veritatis?
              In, mollitia! Possimus officia facere accusamus dolor rem?
            </div>

            <div className="mb-4 rounded-xl bg-white p-3 shadow-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
              dignissimos facere! Nemo esse facilis autem mollitia quis
              asperiores iste delectus ex sit tempora error temporibus eaque
              vero optio nostrum suscipit, quam officia doloribus non. Culpa
              repellat consequuntur dicta illum blanditiis eos praesentium quasi
              qui dolores consectetur minus ipsa dolorem, ipsam, facilis quia
              expedita nam veritatis, necessitatibus facere? Explicabo, officiis
              voluptas est reprehenderit maiores eaque. Voluptatem similique nam
              in facere aperiam velit ipsam aut ad id perferendis blanditiis
              voluptates repellat eaque amet, nihil inventore eveniet assumenda
              provident aliquid? Dolorum similique autem repudiandae veritatis?
              In, mollitia! Possimus officia facere accusamus dolor rem?
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
              dignissimos facere! Nemo esse facilis autem mollitia quis
              asperiores iste delectus ex sit tempora error temporibus eaque
              vero optio nostrum suscipit, quam officia doloribus non. Culpa
              repellat consequuntur dicta illum blanditiis eos praesentium quasi
              qui dolores consectetur minus ipsa dolorem, ipsam, facilis quia
              expedita nam veritatis, necessitatibus facere? Explicabo, officiis
              voluptas est reprehenderit maiores eaque. Voluptatem similique nam
              in facere aperiam velit ipsam aut ad id perferendis blanditiis
              voluptates repellat eaque amet, nihil inventore eveniet assumenda
              provident aliquid? Dolorum similique autem repudiandae veritatis?
              In, mollitia! Possimus officia facere accusamus dolor rem?
            </div>
          </div>
          <div className="sticky top-20 right-0 ml-4 hidden  h-full w-72  overflow-y-scroll lg:flex">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
