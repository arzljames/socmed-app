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
import {
  BsFillEmojiAngryFill,
  BsFillEmojiFrownFill,
  BsFillEmojiHeartEyesFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";

export const API_SERVER: string = "https://api-socmed.onrender.com/";
export const API_SERVER_DEV: string = "http://localhost:3001";

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

export const REACTIONS_EMOJI = [
  { id: 1, reaction: "Like", reaction_icon: "👍" },
  {
    id: 2,
    reaction: "Love",
    reaction_icon: "😍",
  },
  {
    id: 3,
    reaction: "Haha",
    reaction_icon: "😂",
  },
  {
    id: 4,
    reaction: "Sad",
    reaction_icon: "😞",
  },
  {
    id: 5,
    reaction: "Angry",
    reaction_icon: "😠",
  },
];
