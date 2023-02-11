import Head from "next/head";
import Header from "../../components/Home/Header";
import Navbar from "../../components/Home/Navbar";
import Sidebar from "../../components/Home/Sidebar";

const FeedById = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>CreatVe | Post</title>
      </Head>
      <div
        className="flex h-screen min-h-screen
       w-screen flex-col items-start justify-start bg-slate-100 md:w-full md:flex-col"
      >
        <div className="sticky top-0 z-10 h-auto w-full">
          <Header />
          <Navbar />
        </div>
        <div className="flex h-full w-full flex-1 overflow-hidden px-3  md:px-[10%]">
          <Sidebar />
          <div className="flex h-full w-full flex-1 flex-col items-center justify-start overflow-y-auto bg-transparent pt-5  scrollbar-thin md:ml-1 md:mr-3 "></div>
          <div className="sticky top-20 right-0  hidden h-full  w-64  flex-col items-start   justify-start overflow-y-scroll pt-5 pb-4  lg:flex"></div>
        </div>
      </div>
    </>
  );
};

export default FeedById;
