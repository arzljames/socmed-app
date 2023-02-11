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

export const API_SERVER: string = "https://api-creatve.onrender.com";
export const API_SERVER_DEV: string = "http://localhost:3001";
export const CLOUDINARY_URL: string =
  "https://api.cloudinary.com/v1_1/dedfeuejo/upload";


export const HOME_MOBILE_NAV = [
  {
    name: "Home Feed",
    iconActive: IoHome,
    iconInactive: IoHomeOutline,
    path: "/homefeed",
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
  { id: 1, reaction: "Silly", reaction_icon: "😋" },
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
    reaction_icon: "😡",
  },
];

export const ALLOWED_ATTACHMENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "video/mp4",
  "video/x-matroska",
];

// 8mb max size for attachment
export const ATTACHMENT_MAX_SIZE: number = 8388608;

export const NOTIFICATIONS = {
  REACTION: (
    first_name: string,
    last_name: string,
    reaction: string,
    notify_to: string,
    notify_by: string,
    reaction_icon: string,
    post_id: string
  ) => {
    return {
      notification_type: "Reaction",
      notification: `${
        first_name + " " + last_name
      } reacted ${reaction.toLowerCase()} to one of your post`,
      notify_to,
      notify_by,
      link: `/homefeed/post/${post_id}`,
      reaction_icon,
      post_id,
    };
  },
  COMMENT: () => {},
  SHARE: () => {},
  ADD_FRIEND: () => {},
};
