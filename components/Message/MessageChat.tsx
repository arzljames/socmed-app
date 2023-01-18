import { ReactElement } from "react";
import MessageHeader from "./MessageHeader";

const MessageChat = (): ReactElement => {
  return (
    <div className="w-full bg-white">
      <MessageHeader />
      <div></div>
    </div>
  );
};

export default MessageChat;
