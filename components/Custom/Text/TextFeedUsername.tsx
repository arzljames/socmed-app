import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextFeedUsername = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-xs  text-text-sub">{children}</p>;
};

export default TextFeedUsername;
