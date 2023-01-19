import {
  IoHomeOutline,
  IoHome,
  IoPeopleOutline,
  IoPeople,
  IoChatbubblesOutline,
  IoChatbubbles,
  IoLayersOutline,
  IoLayers,
} from "react-icons/io5";

export const API_SERVER: string = "https://api-socmed.onrender.com/";

export const HOME_MOBILE_NAV = [
  {
    name: "Home Feed",
    iconActive: IoHome,
    iconInactive: IoHomeOutline,
    path: "/",
  },

  {
    name: "Messages",
    iconActive: IoChatbubbles,
    iconInactive: IoChatbubblesOutline,
    path: "/messages",
  },

  {
    name: "Friends",
    iconActive: IoPeople,
    iconInactive: IoPeopleOutline,
    path: "/friends",
  },

  {
    name: "Groups",
    iconActive: IoLayers,
    iconInactive: IoLayersOutline,
    path: "/groups",
  },
];

export const CHAT_STATUS = [
  {
    status: "Online",
    color: "bg-green-500",
  },
  {
    status: "Offline",
    color: "bg-gray-400",
  },
  {
    status: "Busy",
    color: "bg-amber-500",
  },
];
