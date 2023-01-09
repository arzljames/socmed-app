import {
  IoHomeOutline,
  IoHome,
  IoPeopleOutline,
  IoPeople,
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipses,
  IoLayersOutline,
  IoLayers,
} from "react-icons/io5";
import { IconType } from "react-icons";

export const API_SERVER: string = "http://localhost:3001";

export const HOME_MOBILE_NAV = [
  {
    name: "Home Feed",
    iconActive: IoHome,
    iconInactive: IoHomeOutline,
    path: "/",
  },

  {
    name: "Message",
    iconActive: IoChatbubbleEllipses,
    iconInactive: IoChatbubbleEllipsesOutline,
    path: "",
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

export interface NavProps {
  name: string;
  iconActive: IconType;
  iconInactive: IconType;
  path: string;
}
