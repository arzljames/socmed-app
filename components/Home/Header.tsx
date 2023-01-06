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
      className={`flex h-16 w-full items-center justify-between  bg-white px-3 ${
        isScrolled ? "md:shadow-md" : "md:border-b-2"
      }`}
    >
      <img className="h-9 w-9 md:hidden" src="/logo.svg" alt="SocMed" />
      <input
        type="search"
        className="hidden h-8  rounded-full bg-gray-100 px-4 text-sm outline-none placeholder:text-xs md:flex md:w-96"
        placeholder="Search and discover things in SocMed"
      />
      <div className="flex items-center justify-end">
        <div className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 md:hidden">
          <IoSearchOutline className="text-gray-800" fontSize={20} />
        </div>
        <div className="relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <div className="absolute top-0 right-0 flex h-4 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
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
