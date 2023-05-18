import { NextPage } from "next";
import Head from "next/head";
import TextHeading from "../components/Custom/Text/TextHeading";

const Friends: NextPage = ({ data }: any) => {
  return (
    <div className="relative h-full w-full">
      <Head>
        <title>Friends | CreatVe</title>
      </Head>
      <div className="scrollbar-thin flex h-full w-72 flex-col items-start justify-start overflow-y-auto border-l bg-transparent  pt-5 md:ml-1  ">
        <div className="flex h-full w-full flex-col  ">
          <div className="sticky top-0 flex w-full  flex-col bg-slate-100 px-3  pb-2">
            <TextHeading>Followers</TextHeading>
          </div>
        </div>
      </div>
      <div className="absolute top-[50%] left-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center">
        <img
          className="mb-2 w-[250px]"
          src="/coming-soon.svg"
          alt="coming soon"
        />
        <p className="text-sm italic text-text-sub"> Feature coming soon.</p>
      </div>
    </div>
  );
};

export default Friends;
