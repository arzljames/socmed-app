import { useRouter } from "next/router";
import { ReactElement, useState, Dispatch, SetStateAction } from "react";
import useRefreshData from "../../hooks/useRefreshData";
import TextHeading from "../Custom/Text/TextHeading";

const AttachmentWarningModal = ({
  setWarning,
}: {
  setWarning: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const handleClose = () => {
    setWarning(false);
    if (show) {
      localStorage.setItem("attachment_warning", "false");
    }
    useRefreshData(router);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white p-5 shadow-md md:w-1/3"
    >
      <div className="mb-3">
        <TextHeading>Warning</TextHeading>
      </div>
      <div className="my-5">
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
      <div className="flex justify-end">
        <button
          onClick={handleClose}
          className={`flex rounded-lg border bg-color-main px-3 py-2 text-sm text-white  duration-100 ease-in-out hover:bg-color-main-dark`}
        >
          Okay, Got It
        </button>
      </div>
    </div>
  );
};

export default AttachmentWarningModal;
