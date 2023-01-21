import { ReactElement } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { postLogin } from "../../api/api";
import Overlay from "../Custom/Overlay";
import LoginLoader from "./LoginLoader";

const LoginForm = (): ReactElement => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<{
    isError: Boolean;
    errMessage: string;
  }>({
    isError: false,
    errMessage: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const status = await postLogin("credentials", account);
      return router.push(status.url);
    } catch (error) {
      setIsLoading(false);
      setAccount({ ...account, password: "" });
      setError({
        isError: true,
        errMessage: "Incorrect username or password",
      });
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full flex-col  items-center  rounded-xl border bg-white px-4 py-10  md:max-w-sm md:px-6"
      >
        <h2 className="text-2xl font-semibold text-text-main">Welcome back</h2>
        <p className="mb-8 text-sm text-text-sub">
          Please enter your credentials
        </p>
        <div className="mb-6 flex w-full flex-col">
          <label className="mb-2 text-sm  text-text-sub">Username</label>
          <input
            className={`h-10 rounded-lg border bg-white fill-white  px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light    ${
              error.isError
                ? "border-red-400 bg-red-50"
                : "border-color-border focus:border-color-main "
            }`}
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setAccount({ ...account, username: e.target.value });
              if (e.target.value === "") {
                setError({ isError: false, errMessage: "" });
              }
            }}
            value={account.username}
          />
          {error.isError && (
            <p className="mt-2 text-sm  text-red-500">{error.errMessage}</p>
          )}
        </div>

        <div className="mb-6 flex w-full flex-col">
          <label className="mb-2 text-sm  text-text-sub">Password</label>

          <input
            className="mb-3 h-10 rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light focus:border-color-main"
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            value={account.password}
          />

          <div className="flex w-full justify-end">
            <a className="cursor-pointer text-xs  text-color-main hover:underline">
              Forgot Password
            </a>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="hover:bg-color-sub mb-5 h-10 w-full  rounded-lg bg-color-main text-sm font-semibold text-white   duration-100 ease-in-out hover:bg-color-main-dark"
        >
          Sign in
        </button>

        <div className=" relative flex w-full justify-center bg-white text-sm content-none before:absolute before:top-1/2 before:left-['50%'] before:h-[1px] before:w-full before:translate-y-1/2 before:translate-x-['-50%'] before:bg-color-border">
          <p className="z-10 bg-white px-2 text-text-main">
            Don't have an account?
            <Link href="/register">
              <span className="ml-1 cursor-pointer font-semibold text-color-main hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>

      {isLoading && (
        <Overlay>
          <LoginLoader />
        </Overlay>
      )}
    </>
  );
};

export default LoginForm;
