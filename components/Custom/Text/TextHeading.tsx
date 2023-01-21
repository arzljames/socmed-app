import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextHeading = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-lg font-semibold text-text-main">{children}</p>;
};

export default TextHeading;
