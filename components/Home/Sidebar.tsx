import React, { ReactElement } from "react";
import SidebarNav from "./SidebarNav";

const Sidebar = (): ReactElement => {
  return (
    <nav className="sticky top-20 left-0 mr-4 hidden h-full w-80 md:flex md:flex-col">
      <SidebarNav />

      <h2 className="mb-5 mt-5 font-semibold">Your Groups</h2>
      <p className="ml-3 text-sm font-light">No group found</p>
    </nav>
  );
};

export default Sidebar;
