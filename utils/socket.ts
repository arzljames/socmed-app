import io from "socket.io-client";
import { API_SERVER_DEV } from "../const";

export const socket = io(API_SERVER_DEV, { transports: ["websocket"] });
// export const socket = io("http://localhost:3000/socket/notification", {
//   transports: ["websocket"],
//   auth: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTAxVDE1OjQxOjEzLjY4OFoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wMy0wNlQwNDo0OTo1NS41NzVaIiwiZ3JvdXAiOiI2M2UwYTFmOThhYTNmMTljMjRlMjFhMjgiLCJzdWJfZ3JvdXAiOiI2M2UzNTEyYjIyZTM4MzcxMGE0OGY5ODAiLCJjb21wYW55IjoiNjNkY2FlODNjY2FkMjY3NGFmMWE4MjkxIn0sImlhdCI6MTY3ODA4MzY5MywiZXhwIjoxNjc4MTcwMDkzfQ.7Tieoa7t__TehmNYU9Y5QUX8ezfK26cQECvqTevEQJM",
//   },
// });
