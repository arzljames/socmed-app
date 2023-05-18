import { ReactElement, Dispatch, SetStateAction } from "react";
import { UserProps } from "../../interface";
import _ from "lodash";
import { IoPersonAdd } from "react-icons/io5";

const PeopleYouMightKnow = ({
  listUsers,
  setToFollow,
  setPromptModal,
}: {
  listUsers: UserProps[];
  setToFollow: Dispatch<SetStateAction<string>>;
  setPromptModal: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  return (
    <div className="scrollbar-none relative flex h-[30%] w-full flex-1 flex-col rounded-xl ">
      <div className="z-10 mb-2 flex h-[20%] max-h-[50px] items-center border-b border-b-gray-300 ">
        <p className=" pl-3 text-sm font-medium text-text-sub">
          People you might know
        </p>
      </div>
      <div className="secondary-scroll flex flex-1 flex-col overflow-y-scroll pr-1">
        {_.map(listUsers, (user) => {
          return (
            <div
              key={user._id}
              className="group relative flex cursor-pointer items-center rounded-xl border border-transparent p-2  hover:border-gray-200 hover:bg-slate-200"
            >
              <div
                className={`mr-2 flex  h-7 w-7 items-center justify-center rounded-full ${user.profile.profile_color} cursor-pointer `}
              >
                {!user?.profile?.profile_photo ? (
                  <p className={"text-sm font-semibold text-white"}>
                    {user.profile.initials}
                  </p>
                ) : (
                  <img src="/" alt="Avatar" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-main">
                  {user.profile.first_name + " " + user.profile.last_name}
                </h3>
              </div>
              <div className="absolute right-5 hidden origin-left  rounded-lg  text-sm text-slate-400 shadow-sm duration-75 ease-in-out group-hover:flex group-hover:text-color-main">
                <div className="over:text-red group/f flex h-full w-full items-center rounded-full px-2 py-2 duration-100 ease-in-out hover:bg-white hover:shadow-md">
                  <IoPersonAdd />
                  <p className="hidden text-xs font-medium  group-hover/f:ml-1 group-hover/f:flex">
                    Follow
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleYouMightKnow;
