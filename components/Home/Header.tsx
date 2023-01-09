import { ReactElement } from "react";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const Header = (): ReactElement => {
  const [isScrolled, setIsScrolled] = useState<Boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={
        "flex h-14 w-full items-center justify-between  bg-white px-3 shadow-md"
      }
    >
      <img className="h-9" src="/logo.svg" alt="SocMed" />
      <input
        type="search"
        className="hidden h-8  rounded-full bg-gray-100 px-4 text-sm outline-none placeholder:text-xs md:flex md:w-1/3"
        placeholder="#Search and discover things in SocMed"
      />
      <div className="flex items-center justify-end">
        <div className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 md:hidden">
          <IoSearchOutline className="text-gray-800" fontSize={20} />
        </div>
        <div className="relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <div className="absolute top-[-2px] right-[-2px] flex h-5 w-6 items-center justify-center rounded-full border-2  border-white bg-red-500 text-xs font-semibold text-white">
            9+
          </div>
          <IoNotificationsOutline className="text-gray-800" fontSize={20} />
        </div>
        <div className="profile mr-2 flex h-9 w-9 items-center justify-center rounded-full border-2">
          AJ
        </div>
      </div>
    </header>
  );
};

export default Header;
