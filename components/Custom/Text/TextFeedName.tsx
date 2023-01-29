import { ReactElement, ReactNode } from "react";

const TextFeedName = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}): ReactElement => {
  return (
    <p className={`text-sm font-semibold text-text-main ${style && style}`}>
      {children}
    </p>
  );
};

export default TextFeedName;
