import Link from "next/link";
import { ReactElement } from "react";
import { HOME_MOBILE_NAV, NavProps } from "../../../const";
import { useRouter } from "next/router";

const SidebarNav = (): ReactElement => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <ul className="mt-10 mb-5">
      {HOME_MOBILE_NAV?.map((item: NavProps) => {
        return (
          <li
            className={`${
              pathName === item.path && "bg-gray-200"
            } mb-2 h-10 rounded-md px-2 duration-100 ease-in-out hover:bg-gray-200`}
            key={item.name}
          >
            <Link className="flex h-full w-full items-center" href={item.path}>
              {pathName === item.path ? (
                <item.iconActive className="mr-2 text-[#385E72]" />
              ) : (
                <item.iconInactive className="mr-2 text-gray-500" />
              )}{" "}
              <p
                className={`${
                  pathName === item.path
                    ? "font-semibold  text-[#385E72]"
                    : "text-gray-500"
                } text-sm`}
              >
                {item.name}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNav;
