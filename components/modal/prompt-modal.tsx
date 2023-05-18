import React, { Dispatch, SetStateAction } from "react";
import CancelBtn from "../button/cancel-btn";
import DeleteBtn from "../button/delete-btn";
import CustomLoader from "../Custom/Loader";
import TextHeading from "../Custom/Text/TextHeading";

interface IPromptModal {
  setPromptModal: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  clickEvent: any;
  title: string;
  message: string;
  btnName: string;
}

const PromptModal = ({
  setPromptModal,
  isLoading,
  clickEvent,
  btnName,
  title,
  message,
}: IPromptModal) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white px-3 shadow-md md:w-1/3 md:px-4"
    >
      <div className="flex h-16 items-center justify-center border-b">
        <TextHeading>{title}</TextHeading>
      </div>
      <div className="py-3 md:py-4">
        <p className="text-sm text-text-main">{message}</p>
      </div>
      <div className="flex justify-end py-3 md:py-4">
        <CancelBtn clickEvent={() => setPromptModal(false)}>
          <p>Cancel</p>
        </CancelBtn>
        <DeleteBtn clickEvent={clickEvent} isDeleting={isLoading}>
          {isLoading && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
          btnName
        </DeleteBtn>
      </div>
    </div>
  );
};

export default PromptModal;
