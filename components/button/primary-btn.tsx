import { ReactElement, ReactNode } from "react";

const PrimaryBtn = ({
  children,
  clickEvent,
}: {
  children: ReactNode;
  clickEvent?: any;
}): ReactElement => {
  return (
    <div
      onClick={clickEvent}
      className="mr-2 flex min-w-[80px] cursor-pointer select-none items-center justify-center rounded-lg border bg-color-main  px-3 py-[6px] text-sm text-white  duration-100 ease-in-out hover:bg-color-main-dark"
    >
      {children}
    </div>
  );
};

export default PrimaryBtn;
