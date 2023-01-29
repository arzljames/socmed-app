import { ReactElement, useEffect, useState, useRef } from "react";

const LoginHeader = (): ReactElement => {
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
      className={`sticky top-0 z-10 flex h-[60px] w-full items-center  px-3  md:px-[10%] ${
        isScrolled && "bg-white bg-opacity-95 shadow-md"
      }`}
    >
      <img
        src={isScrolled ? "/logo-dark.svg" : "/logo-light.svg"}
        alt="Logo"
        className="h-9"
      />
    </header>
  );
};

export default LoginHeader;
