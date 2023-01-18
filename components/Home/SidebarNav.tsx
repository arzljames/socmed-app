import Link from "next/link";
import { ReactElement } from "react";
import { HOME_MOBILE_NAV } from "../../const";
import { useRouter } from "next/router";
import { NavProps } from "../../interface";

const SidebarNav = (): ReactElement => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <ul>
      {HOME_MOBILE_NAV?.map((item: NavProps) => {
        return (
          <li
            className={`${
              pathName === item.path && "bg-color-main-light"
            } mb-1 h-10 rounded-md px-2 duration-100 ease-in-out hover:bg-color-main-light`}
            key={item.name}
          >
            <Link className="flex h-full w-full items-center" href={item.path}>
              {pathName === item.path ? (
                <item.iconActive className="mr-2 text-color-main-dark" />
              ) : (
                <item.iconInactive className="mr-2 text-color-main" />
              )}{" "}
              <p
                className={`${
                  pathName === item.path
                    ? "font-bold  text-color-main-dark"
                    : "font-medium text-text-sub"
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
