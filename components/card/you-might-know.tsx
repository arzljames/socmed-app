import { ReactElement } from "react";
import { UserProps } from "../../interface";
import _ from "lodash";
import { IoPersonAdd } from "react-icons/io5";

const PeopleYouMightKnow = ({
  listUsers,
}: {
  listUsers: UserProps[];
}): ReactElement => {
  return (
    <div className="relative w-full flex-1 overflow-y-scroll rounded-xl border bg-white px-3 scrollbar-none">
      <div className="sticky top-0 z-10 flex h-12 items-center  bg-white">
        <p className=" text-sm font-medium text-text-main">You might know</p>
      </div>
      <div className=" flex flex-col">
        {_.map(listUsers, (user) => {
          return (
            <div
              key={user._id}
              className="h  relative mb-2 flex  cursor-pointer items-center rounded-lg border border-transparent p-2 duration-75 ease-in-out hover:border-gray-200  hover:shadow-md"
            >
              <div
                className={`mr-2 flex  h-8 w-8 items-center justify-center rounded-full ${user.profile.profile_color} cursor-pointer `}
              >
                {!user?.profile?.profile_photo ? (
                  <p className={"font-semibold text-white"}>
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
                <p className="text-xs font-light text-text-sub">
                  @{user.username}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleYouMightKnow;
