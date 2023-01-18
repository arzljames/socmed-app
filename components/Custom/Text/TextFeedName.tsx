import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextFeedName = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-base font-bold text-text-main">{children}</p>;
};

export default TextFeedName;
