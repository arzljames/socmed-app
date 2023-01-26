import io from "socket.io-client";
import { API_SERVER_DEV } from "../const";

export const socket = io(API_SERVER_DEV, { transports: ["websocket"] });
