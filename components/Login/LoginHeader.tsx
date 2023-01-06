import { ReactElement } from "react";

const LoginHeader = (): ReactElement => {
  return (
    <header className="sticky top-0 flex h-14 w-full items-center bg-white px-3 shadow-md md:px-6">
      <img src="/logo.svg" alt="Logo" className="h-9" />
    </header>
  );
};

export default LoginHeader;
