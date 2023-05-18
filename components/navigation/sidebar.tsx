import Link from "next/link";
import { ReactElement } from "react";
import { HOME_MOBILE_NAV } from "../../const";
import { useRouter } from "next/router";
import { NavProps } from "../../interface";

const Sidebar = (): ReactElement => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <nav className="hidden h-full w-60 flex-col items-start justify-start pt-5 md:flex">
      <ul className="w-full select-none">
        {HOME_MOBILE_NAV?.map((item: NavProps) => {
          return (
            <li
              className={`${
                pathName.includes(item.path) && " bg-white shadow-sm"
              } mb-1 h-10 rounded-lg px-2 duration-75 ease-in-out hover:bg-white`}
              key={item.name}
            >
              <Link
                onClick={() => router.replace(item.path)}
                className="flex h-full w-full items-center "
                href={item.path}
              >
                {pathName.includes(item.path) ? (
                  <item.iconActive className="mr-2 text-color-main" />
                ) : (
                  <item.iconInactive className="mr-2 text-color-main" />
                )}{" "}
                <p
                  className={`${
                    pathName.includes(item.path)
                      ? "font-semibold  text-color-main"
                      : "text-text-sub"
                  } text-sm`}
                >
                  {item.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
