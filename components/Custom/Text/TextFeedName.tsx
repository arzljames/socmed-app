import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextFeedName = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-sm font-medium text-text-main">{children}</p>;
};

export default TextFeedName;
