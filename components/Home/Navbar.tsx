import { ReactElement } from "react";
import { IconType } from "react-icons";
import { HOME_MOBILE_NAV, NavProps } from "../../const/index";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = (): ReactElement => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <nav className="flex h-12 w-full items-center justify-between border-t-0 border-b-2 bg-white px-3 pb-1 md:hidden">
      {HOME_MOBILE_NAV?.map((item: NavProps) => {
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`flex h-full flex-1 items-center justify-center rounded-lg  text-lg ${
              pathName === item.path && "bg-gray-200"
            }`}
          >
            {pathName === item.path ? (
              <item.iconActive className="text-[#385E72]" />
            ) : (
              <item.iconInactive className="text-gray-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
