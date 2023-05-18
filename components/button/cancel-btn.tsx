import { ReactElement, ReactNode } from "react";

const CancelBtn = ({
  children,
  clickEvent,
}: {
  children: ReactNode;
  clickEvent?: any;
}): ReactElement => {
  return (
    <div
      onClick={clickEvent}
      className="mr-2 flex min-w-[80px] cursor-pointer select-none items-center justify-center rounded-lg border bg-white  px-3 py-[6px] text-sm  duration-100 ease-in-out hover:shadow-md"
    >
      {children}
    </div>
  );
};

export default CancelBtn;
