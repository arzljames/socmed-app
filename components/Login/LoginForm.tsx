import { ReactElement } from "react";
import { useState } from "react";
import Link from "next/link";

const LoginForm = (): ReactElement => {
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col  items-center  rounded-xl border bg-white px-4 py-10 shadow-sm md:max-w-sm md:px-6"
    >
      <h2 className="text-2xl font-semibold text-text-main">Welcome Back</h2>
      <p className="mb-8 text-sm text-text-sub">
        Please enter your credentials
      </p>
      <div className="mb-6 flex w-full flex-col">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Username
        </label>
        <input
          className="h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
          value={account.username}
        />
      </div>

      <div className="mb-6 flex w-full flex-col">
        <label className="mb-2 text-sm font-semibold text-text-sub">
          Password
        </label>

        <input
          className="mb-3 h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out focus:border-color-main"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
          value={account.password}
        />

        <div className="flex w-full justify-end">
          <a className="cursor-pointer text-xs font-medium text-color-main-dark hover:underline">
            Forgot Password
          </a>
        </div>
      </div>

      <button className="hover:bg-color-sub mb-5 h-10 w-full  rounded-lg bg-color-main text-sm font-semibold text-white   duration-100 ease-in-out hover:bg-color-main-dark">
        Sign in
      </button>

      <div className=" relative flex w-full justify-center bg-white text-sm content-none before:absolute before:top-1/2 before:left-['50%'] before:h-[1px] before:w-full before:translate-y-1/2 before:translate-x-['-50%'] before:bg-color-border">
        <p className="z-10 bg-white px-2">
          Don't have an account?
          <Link href="/register">
            <span className="ml-1 cursor-pointer font-semibold text-color-main-dark hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
