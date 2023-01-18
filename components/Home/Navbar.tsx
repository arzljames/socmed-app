import { ReactElement } from "react";
import { HOME_MOBILE_NAV } from "../../const/index";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavProps } from "../../interface";

const Navbar = (): ReactElement => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <nav className="flex h-[50px] w-full items-center justify-between border-t-0 border-b-2 bg-white px-3  md:hidden">
      {HOME_MOBILE_NAV?.map((item: NavProps) => {
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`flex h-full flex-1 items-center justify-center   text-lg ${
              pathName === item.path && "border-b-2 border-b-color-main-dark"
            }`}
          >
            {pathName === item.path ? (
              <item.iconActive className="text-color-main-dark" />
            ) : (
              <item.iconInactive className="text-color-main opacity-70" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
