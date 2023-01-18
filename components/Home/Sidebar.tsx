import React, { ReactElement } from "react";
import SidebarNav from "./SidebarNav";

const Sidebar = (): ReactElement => {
  return (
    <nav className="hidden h-full w-80 overflow-y-scroll px-3 py-8 md:block">
      <SidebarNav />
      <h2 className="mb-5 mt-5 font-semibold">Your Groups</h2>
      <p className="ml-3 text-sm font-light">No group found</p>
    </nav>
  );
};

export default Sidebar;
