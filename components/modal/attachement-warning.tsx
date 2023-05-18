import { ReactElement, useState, Dispatch, SetStateAction } from "react";
import PrimaryBtn from "../button/primary-btn";
import TextHeading from "../Custom/Text/TextHeading";

const AttachmentWarningModal = ({
  setWarning,
}: {
  setWarning: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setWarning(false);
    if (show) {
      localStorage.setItem("attachment_warning", "false");
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white px-3 shadow-md md:w-1/3 md:px-4"
    >
      <div className="flex h-16 items-center justify-center border-b ">
        <TextHeading>Warning</TextHeading>
      </div>
      <div className="py-3 md:py-4">
        <p className="mb-4 text-sm text-text-main">
          Due to limited resources, we set the maximum size of attachment up to
          8mb only. Take note that you can only attach at least one (1)
          attachment per post.
        </p>
        <div className=" flex">
          <input
            checked={show}
            onChange={() => setShow(!show)}
            className="mr-2 cursor-pointer rounded-full"
            type="checkbox"
          />
          <p className="text-sm  text-text-sub">Don't show again</p>
        </div>
      </div>
      <div className="flex justify-end py-3 md:py-4">
        <PrimaryBtn clickEvent={handleClose}>Okay, Got It</PrimaryBtn>
      </div>
    </div>
  );
};

export default AttachmentWarningModal;
