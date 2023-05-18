import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { PUT } from "../../utils/api/api";
import useUserData from "../../hooks/useUserData";
import { UserProps } from "../../interface";

const WelcomeModal = ({
  setIsNewUser,
}: {
  setIsNewUser: Dispatch<SetStateAction<Boolean>>;
}): ReactElement => {
  const { user, token } = useUserData() as { user: UserProps; token: string };
  const handleUpdateUser = async () => {
    try {
      const res = await PUT("/api/user/new-user/", token);
      return res.data;
    } catch (error) {
    } finally {
      setIsNewUser(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-text-main bg-opacity-30 md:overflow-y-scroll md:py-10">
      <div className="div flex h-full w-full flex-col items-center justify-center bg-white p-7 shadow-lg md:h-auto md:min-h-[80%] md:w-[50%] md:rounded-lg">
        <div className="w-full">
          <img src="/welcome.svg" alt="welcome" className="object-cover" />
        </div>
        <div>
          <h1 className="mb-4 text-xl font-bold text-text-main">
            Welcome, {user.profile.first_name + " " + user.profile.last_name}!
          </h1>
          <p className="mb-20 text-sm text-text-main">
            Welcome aboard to{" "}
            <span className="font-semibold text-color-main">Creat</span>
            <span className="font-semibold text-color-main-2">Ve</span> where
            you can create, interact, and view different stuffs online. Feel
            free to explore our social media platform and make sure to verify
            your account to unlock more content. Cheers!
          </p>
          <div className="flex items-center justify-end">
            <button
              onClick={handleUpdateUser}
              className="flex items-center rounded-md border border-color-main-dark p-2 font-medium text-color-main-dark duration-100 ease-in-out hover:bg-color-main hover:text-white"
            >
              Proceed <HiOutlineArrowNarrowRight className="ml-2 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
