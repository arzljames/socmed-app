import io from "socket.io-client";
import { API_SERVER } from "../const";

export const socket = io(API_SERVER, { transports: ["websocket"] });
