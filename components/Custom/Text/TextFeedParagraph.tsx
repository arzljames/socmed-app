import { ReactElement } from "react";
import { ReactChildrenProps } from "../../../interface";

const TextParagraph = ({ children }: ReactChildrenProps): ReactElement => {
  return (
    <p className="whitespace-pre-wrap text-sm text-text-main md:text-sm">
      {children}
    </p>
  );
};

export default TextParagraph;
