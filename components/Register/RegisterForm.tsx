import { ReactElement, useState } from "react";
import Link from "next/link";
import { postRegister } from "../../api/api";
import Error from "next/error";
import {
  AccountRegisterProps,
  RegisterValidationErrors,
} from "../../interface";
import registerFormValidation from "../../utils/RegisterFormValidation";
import _ from "lodash";

const RegisterForm = (): ReactElement => {
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
      const res = await postRegister("/api/auth/register", account);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col  items-center  rounded-xl border bg-white px-4 py-10 shadow-sm md:max-w-sm md:px-6"
    >
      <h2 className="text-2xl font-semibold text-text-main">
        Create an account
      </h2>
      <p className="mb-8 text-sm text-text-sub">
        The next social media platform
      </p>

      <div className="mb-4 flex w-full justify-between">
        <div className="flex w-[48%] flex-col">
          <label className="mb-2 text-sm text-text-sub">First Name</label>
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
          <label className="mb-2 text-sm  text-text-sub">Last Name</label>
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
        <label className="mb-2 text-sm  text-text-sub">Email</label>
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
          <p className="mt-2 text-sm  text-red-500">{errors.email_error_msg}</p>
        )}
      </div>

      <div className="mb-4 flex w-full flex-col ">
        <label className="mb-2 text-sm  text-text-sub">Username</label>
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
        <label className="mb-2 text-sm  text-text-sub">Password</label>

        <input
          value={account.password}
          onChange={(e) => {
            setAccount({ ...account, password: e.target.value });
            if (account.password === "") {
              setErrors({
                ...errors,
                password_error: false,
                password_error_msg: "",
              });
            }
          }}
          className={`h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
            errors.password_error
              ? "border-red-400 bg-red-50"
              : "border-color-border focus:border-color-main "
          } `}
          type="password"
          placeholder="Enter Password"
        />
        {errors.password_error && (
          <p className="mt-2 text-sm  text-red-500">
            {errors.password_error_msg}
          </p>
        )}
      </div>

      <div className="mb-4 flex w-full flex-col">
        <label className="mb-2 text-sm  text-text-sub">Confirm Password</label>

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
          className={`mb-3 h-10 rounded-lg border  bg-white px-2 text-sm outline-none duration-100 ease-in-out placeholder:font-light ${
            errors.confirm_password_error
              ? "border-red-400 bg-red-50"
              : "border-color-border focus:border-color-main "
          }`}
          type="password"
          placeholder="Enter Password"
        />
        {errors.confirm_password_error && (
          <p className="mt-[-5px] mb-3  text-sm text-red-500">
            {errors.confirm_password_error_msg}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="hover:bg-color-sub mb-5 h-10 w-full  rounded-lg bg-color-main text-sm font-semibold text-white   duration-100 ease-in-out hover:bg-color-main-dark"
      >
        Sign up
      </button>

      <div className=" relative flex w-full justify-center bg-white text-sm content-none before:absolute before:top-1/2 before:left-['50%'] before:h-[1px] before:w-full before:translate-y-1/2 before:translate-x-['-50%'] before:bg-color-border">
        <p className="z-10 bg-white px-2 text-text-main">
          Already have an account?
          <Link href="/login">
            <span className="ml-1 cursor-pointer font-semibold text-color-main hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
