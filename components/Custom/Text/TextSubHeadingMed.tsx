import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextSubHeadingMed = ({ children }: ReactChildrenProps): ReactElement => {
  return <p className="text-sm font-semibold text-text-sub">{children}</p>;
};

export default TextSubHeadingMed;
