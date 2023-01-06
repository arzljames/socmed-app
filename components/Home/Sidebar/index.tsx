import React, { ReactElement } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

const Sidebar = (): ReactElement => {
  return (
    <nav className="sticky top-0 left-0  hidden h-screen w-60 overflow-y-auto bg-gray-100 px-3 md:flex md:flex-col">
      <SidebarHeader />
      <SidebarNav />

      <h2 className="mb-5 font-semibold">Your Groups</h2>
      <p className="ml-3 text-sm font-light">No group found</p>
    </nav>
  );
};

export default Sidebar;
