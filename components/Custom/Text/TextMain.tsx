import { ReactElement, ReactNode } from "react";

const TextMain = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}): ReactElement => {
  return (
    <p className={`text-sm text-text-main ${style && style}`}>{children}</p>
  );
};

export default TextMain;
