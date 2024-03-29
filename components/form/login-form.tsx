import { ReactElement, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "../../utils/api/api";
import { IoEyeOff, IoEye } from "react-icons/io5";
import CustomLoader from "../Custom/Loader";

const LoginForm = ({
  demo_username,
  demo_password,
}: {
  demo_username?: string;
  demo_password?: string;
}): ReactElement => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      const status = await login("credentials", account);
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

  useEffect(() => {
    if (demo_password || demo_username) {
      const demoLogin = async () => {
        const status = await login("credentials", {
          username: demo_username,
          password: demo_password,
        });
        router.push(status.url);
      };

      demoLogin();
    }
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-y-scroll bg-white  py-8 md:w-[40%]"
      >
        <div className="w-full max-w-[400px] px-3">
          <div className="mb-8 flex w-full flex-col items-center">
            <img
              src="/assets/favicon.ico"
              alt="logo"
              className="mb-3 h-11 w-11"
            />
            <h2 className="text-2xl font-semibold text-text-main">
              Welcome back
            </h2>
            <p className="text-sm text-text-sub">
              Please enter your credentials
            </p>
          </div>
          <div className="mb-6 flex w-full flex-col">
            <label className="mb-2 text-sm font-medium text-text-sub">
              Username
            </label>
            <input
              className={`h-10 rounded-lg border bg-transparent   px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light    ${
                error.isError
                  ? "border-red-400 bg-red-50"
                  : "border-color-border focus:border-color-main "
              }`}
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                setAccount({ ...account, username: e.target.value });

                setError({ isError: false, errMessage: "" });
              }}
              value={account.username}
            />
            {error.isError && (
              <p className="mt-2 text-sm  text-red-500">{error.errMessage}</p>
            )}
          </div>

          <div className="mb-4 flex w-full flex-col">
            <div className="flex items-baseline justify-between">
              <label className="mb-2 text-sm font-medium text-text-sub">
                Password
              </label>

              <p className="cursor-pointer text-xs italic text-color-main-dark hover:underline">
                Forgot password?
              </p>
            </div>

            <div className="relative mb-3 w-full ">
              <input
                className="h-10 w-full rounded-lg border border-color-border bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light focus:border-color-main"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                value={account.password}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center  text-lg  text-gray-400  duration-100 ease-in-out hover:text-color-main"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`hover:bg-color-sub mb-5 flex h-10 w-full items-center justify-center rounded-lg  bg-gradient-to-r from-color-main to-color-main-2   text-sm font-medium text-white duration-100 ease-in-out hover:from-color-main hover:to-color-main ${
              isLoading &&
              "cursor-not-allowed to-color-main-2 opacity-60 hover:from-color-main"
            }`}
          >
            {isLoading ? (
              <>
                <CustomLoader h="18" m="mr-2" w="18" c="#fff" /> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <div className="w-f relative flex w-full justify-center  text-sm content-none ">
            <p className="z-10 bg-white px-2 text-text-main">
              Don't have an account?
              <Link href="/register">
                <span className="ml-1 cursor-pointer font-semibold text-color-main-dark hover:underline">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
