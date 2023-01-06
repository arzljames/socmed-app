import { ReactElement } from "react";

const SidebarHeader = (): ReactElement => {
  return (
    <header className="flex h-16 w-full items-center">
      <img className="mr-3 h-9 w-9" src="/logo.svg" alt="Logo" />
      <div className="flex text-[#385E72]">
        <p className="text-lg font-bold ">Soc</p>
        <p className="text-lg font-light">Med</p>
      </div>
    </header>
  );
};

export default SidebarHeader;
