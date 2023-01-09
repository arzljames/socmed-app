import { ReactElement } from "react";
import Link from "next/link";

const RegisterForm = (): ReactElement => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col  items-center  rounded-xl border bg-white px-4 py-10 shadow-sm md:max-w-sm md:px-6"
    >
      <h2 className="text-2xl font-semibold text-text-main">
        Create An Account
      </h2>
      <p className="mb-8 text-sm text-text-sub">
        The next social media platform
      </p>

      <div className="mb-4 flex w-full justify-between">
        <div className="flex w-[48%] flex-col">
          <label className="mb-2 text-sm font-semibold text-text-sub">
            First Name
          </label>
          <input
            className="h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
            type="text"
            placeholder="Enter First Name"
          />
        </div>

        <div className="flex w-[48%] flex-col">
          <label className="mb-2 text-sm font-semibold text-text-sub">
            Last Name
          </label>
          <input
            className="h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
            type="text"
            placeholder="Enter Last Name"
          />
        </div>
      </div>

      <div className="mb-4 flex w-full flex-col ">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Email
        </label>
        <input
          className="h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="email"
          placeholder="email@example.com"
        />
      </div>

      <div className="mb-4 flex w-full flex-col ">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Username
        </label>
        <input
          className="h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="text"
          placeholder="Enter Username"
        />
      </div>

      <div className="mb-4 flex w-full flex-col">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Password
        </label>

        <input
          className=" h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="password"
          placeholder="Enter Password"
        />
      </div>

      <div className="mb-4 flex w-full flex-col">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Confirm Password
        </label>

        <input
          className="mb-3 h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="password"
          placeholder="Enter Password"
        />
      </div>

      <button className="hover:bg-color-sub mb-5 h-10 w-full  rounded-lg bg-color-main text-sm font-semibold text-white   duration-100 ease-in-out hover:bg-color-main-dark">
        Sign in
      </button>

      <div className=" relative flex w-full justify-center bg-white text-sm content-none before:absolute before:top-1/2 before:left-['50%'] before:h-[1px] before:w-full before:translate-y-1/2 before:translate-x-['-50%'] before:bg-color-border">
        <p className="z-10 bg-white px-2">
          Already have an account?
          <Link href="/login">
            <span className="ml-1 cursor-pointer font-semibold text-color-main-dark hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
