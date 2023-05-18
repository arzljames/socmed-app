import { ReactElement, ReactNode } from "react";

const DeleteBtn = ({
  children,
  clickEvent,
  isDeleting,
}: {
  children: ReactNode;
  clickEvent?: any;
  isDeleting?: boolean;
}): ReactElement => {
  return (
    <div
      onClick={clickEvent}
      className={`flex cursor-pointer rounded-lg border bg-red-500 px-3 py-[6px] text-sm text-white ${
        isDeleting && "pointer-events-none opacity-50"
      } duration-100 ease-in-out hover:bg-red-600`}
    >
      {children}
    </div>
  );
};

export default DeleteBtn;
