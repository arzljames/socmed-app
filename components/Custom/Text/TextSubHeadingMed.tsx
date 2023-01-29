import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextSubHeadingMed = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-sm font-medium text-text-sub">{children}</p>;
};

export default TextSubHeadingMed;
