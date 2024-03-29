import { ReactElement, useState } from "react";
import Link from "next/link";
import { register, login } from "../../utils/api/api";
import Error from "next/error";
import {
  AccountRegisterProps,
  RegisterValidationErrors,
} from "../../interface";
import registerFormValidation from "../../utils/RegisterFormValidation";
import _ from "lodash";
import Overlay from "../Custom/Overlay";
import { useRouter } from "next/router";
import { IoEyeOff, IoEye } from "react-icons/io5";
import CustomLoader from "../Custom/Loader";

const RegisterForm = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const router = useRouter();
  const [account, setAccount] = useState<AccountRegisterProps>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<RegisterValidationErrors>({
    fname_error: false,
    fname_error_msg: "",
    lname_error: false,
    lname_error_msg: "",
    email_error: false,
    email_error_msg: "",
    username_error: false,
    username_error_msg: "",
    password_error: false,
    password_error_msg: "",
    confirm_password_error: false,
    confirm_password_error_msg: "",
  });

  const handleSubmit = async () => {
    const isValid = registerFormValidation(account, errors, setErrors);
    if (!isValid) return;

    try {
      setIsLoading(true);

      await register("/api/auth/register", account);

      const status = await login("credentials", {
        username: account.username,
        password: account.password,
      });
      return router.push(status.url);
    } catch (error) {
      setIsLoading(false);
      if (
        error?.response &&
        error.response.data.error.toLowerCase().includes("username")
      ) {
        setErrors({
          ...errors,
          username_error: true,
          username_error_msg: error.response.data.error,
        });
      }

      if (
        error?.response &&
        error.response.data.error.toLowerCase().includes("email")
      ) {
        setErrors({
          ...errors,
          email_error: true,
          email_error_msg: error.response.data.error,
        });
      }

      throw new Error(error);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex h-full w-full flex-col items-center overflow-y-scroll bg-white  py-8 md:w-[40%]"
      >
        <div className="w-full max-w-[400px] px-3">
          <div className="mb-8 flex w-full flex-col items-center">
            <img
              src="/assets/favicon.ico"
              alt="logo"
              className="mb-3 h-11 w-11"
            />
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold text-text-main">
                Create an account
              </h2>
              <p className="text-sm text-text-sub">
                Few clicks away from creating your account
              </p>
            </div>
          </div>

          <div className="mb-4 flex w-full justify-between">
            <div className="flex w-[48%] flex-col">
              <label className="mb-2 text-sm font-medium text-text-sub">
                First Name
              </label>
              <input
                value={account.first_name}
                onChange={(e) => {
                  setAccount({ ...account, first_name: e.target.value });
                  if (account.first_name === "") {
                    setErrors({
                      ...errors,
                      fname_error: false,
                      fname_error_msg: "",
                    });
                  }
                }}
                className={`h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                  errors.fname_error
                    ? "border-red-400 bg-red-50"
                    : "border-color-border focus:border-color-main "
                }`}
                type="text"
                placeholder="Enter First Name"
              />
              {errors.fname_error && (
                <p className="mt-2 text-sm  text-red-500">
                  {errors.fname_error_msg}
                </p>
              )}
            </div>

            <div className="flex w-[48%] flex-col">
              <label className="mb-2 text-sm font-medium text-text-sub">
                Last Name
              </label>
              <input
                value={account.last_name}
                onChange={(e) => {
                  setAccount({ ...account, last_name: e.target.value });
                  if (account.last_name === "") {
                    setErrors({
                      ...errors,
                      lname_error: false,
                      lname_error_msg: "",
                    });
                  }
                }}
                className={`h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                  errors.lname_error
                    ? "border-red-400 bg-red-50"
                    : "border-color-border focus:border-color-main "
                }`}
                type="text"
                placeholder="Enter Last Name"
              />
              {errors.lname_error && (
                <p className="mt-2 text-sm  text-red-500">
                  {errors.lname_error_msg}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 flex w-full flex-col ">
            <label className="mb-2 text-sm font-medium text-text-sub">
              Email
            </label>
            <input
              value={account.email}
              onChange={(e) => {
                setAccount({ ...account, email: e.target.value });
                if (account.email === "") {
                  setErrors({
                    ...errors,
                    email_error: false,
                    email_error_msg: "",
                  });
                }
              }}
              className={`h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                errors.email_error
                  ? "border-red-400 bg-red-50"
                  : "border-color-border focus:border-color-main "
              }`}
              type="email"
              placeholder="email@example.com"
            />
            {errors.email_error && (
              <p className="mt-2 text-sm  text-red-500">
                {errors.email_error_msg}
              </p>
            )}
          </div>

          <div className="mb-4 flex w-full flex-col ">
            <label className="mb-2 text-sm font-medium text-text-sub">
              Username
            </label>
            <input
              value={account.username}
              onChange={(e) => {
                setAccount({ ...account, username: e.target.value });
                if (account.username === "") {
                  setErrors({
                    ...errors,
                    username_error: false,
                    username_error_msg: "",
                  });
                }
              }}
              className={`h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                errors.username_error
                  ? "border-red-400 bg-red-50"
                  : "border-color-border focus:border-color-main "
              } `}
              type="text"
              placeholder="Enter Username"
            />
            {errors.username_error && (
              <p className="mt-2 text-sm  text-red-500">
                {errors.username_error_msg}
              </p>
            )}
          </div>

          <div className="mb-4 flex w-full flex-col">
            <label className="mb-2 text-sm font-medium text-text-sub">
              Password
            </label>

            <div className="relative w-full">
              <input
                value={account.password}
                onChange={(e) => {
                  setAccount({ ...account, password: e.target.value });

                  setErrors({
                    ...errors,
                    password_error: false,
                    password_error_msg: "",
                  });
                }}
                className={`h-10 w-full rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                  errors.password_error
                    ? "border-red-400 bg-red-50"
                    : "border-color-border focus:border-color-main "
                } `}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center  text-lg  text-gray-400 duration-100 ease-in-out hover:text-color-main"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
            {errors.password_error && (
              <p className="mt-2 text-sm  text-red-500">
                {errors.password_error_msg}
              </p>
            )}
          </div>

          <div className="mb-4 flex w-full flex-col">
            <label className="mb-2 text-sm font-medium text-text-sub">
              Confirm Password
            </label>

            <div className="relative w-full">
              <input
                onChange={(e) => {
                  setAccount({ ...account, confirm_password: e.target.value });
                  if (account.confirm_password === "") {
                    setErrors({
                      ...errors,
                      confirm_password_error: false,
                      confirm_password_error_msg: "",
                    });
                  }
                }}
                className={`mb-3 h-10 w-full rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
                  errors.confirm_password_error
                    ? "border-red-400 bg-red-50"
                    : "border-color-border focus:border-color-main "
                }`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center  text-lg  text-gray-400 duration-100 ease-in-out hover:text-color-main"
              >
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
            {errors.confirm_password_error && (
              <p className="mt-[-5px] mb-3  text-sm text-red-500">
                {errors.confirm_password_error_msg}
              </p>
            )}
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
                <CustomLoader h="18" m="mr-2" w="18" c="#fff" /> Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>

          <div className=" relative flex w-full justify-center bg-white text-sm content-none ">
            <p className="z-10 bg-white px-2 text-text-main">
              Already have an account?
              <Link href="/login">
                <span className="ml-1 cursor-pointer font-semibold text-color-main hover:underline">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
