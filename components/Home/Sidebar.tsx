import React, { ReactElement } from "react";
import SidebarNav from "./SidebarNav";

const Sidebar = (): ReactElement => {
  return (
    <nav className="hidden h-full overflow-y-scroll pt-5   md:block md:w-56">
      <SidebarNav />
    </nav>
  );
};

export default Sidebar;
