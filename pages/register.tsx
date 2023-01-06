import { NextPage } from "next";
import Link from "next/link";
const register: NextPage = () => {
  return (
    <div className="flex h-full min-h-screen flex-1 flex-col items-center justify-center pb-6 sm:bg-white md:bg-[#EFEFEF]">
      <div className="flex  h-auto w-full items-center justify-between px-6 py-6">
        <img src="/logo.svg" alt="SocMed" />
        <div className="flex h-full items-center ">
          <p className="mr-2 hidden text-xs md:block">Have an account?</p>
          <Link href="/login">
            <button className="rounded-md border border-[#C6C6C6] px-2 py-2 text-xs font-semibold duration-150 ease-in-out hover:bg-white hover:shadow-md">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex  w-full flex-col items-center rounded-md bg-white px-5 py-10 md:max-w-sm md:shadow-md"
        >
          <h2 className="mb-6 text-xl font-semibold text-[#272727]">Sign Up</h2>
          <div className="mb-5 flex w-full flex-col">
            <label className="mb-2 text-sm font-medium">Username</label>
            <input
              className="h-9 rounded-md border border-[#C0C0C0] px-2 text-sm outline-none duration-100 ease-in-out focus:border-[#385E72]"
              type="text"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-6 flex w-full flex-col">
            <label className="mb-2 text-sm font-medium">Password</label>
            <input
              className="h-9 rounded-md border border-[#C0C0C0] px-2 text-sm outline-none duration-100 ease-in-out focus:border-[#385E72]"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <button className="h-9 w-full rounded-md bg-[#385E72] text-sm font-semibold text-white hover:bg-[#2E4F60]">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default register;
