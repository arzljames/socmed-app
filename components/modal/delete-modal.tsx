import React, { Dispatch, SetStateAction } from "react";
import { IoWarning } from "react-icons/io5";
import CancelBtn from "../button/cancel-btn";
import DeleteBtn from "../button/delete-btn";
import CustomLoader from "../Custom/Loader";
import TextHeading from "../Custom/Text/TextHeading";

interface IDeleteModal {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  isDeleting: boolean;
  handleDelete: any;
  message?: string;
}

const DeleteModal = ({
  setDeleteModal,
  isDeleting,
  handleDelete,
  message = "Are you really sure you want to delete this post?",
}: IDeleteModal) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white px-3 shadow-md md:w-1/3 md:px-4"
    >
      <div className="flex h-16 items-center justify-center border-b">
        <TextHeading>Delete Post</TextHeading>
      </div>
      <div className="py-3 md:py-4">
        <p className="mb-4 text-sm text-text-main">{message}</p>
        <div className="flex items-center  rounded-l-md rounded-r-md border  border-red-300 bg-red-100 p-3">
          <IoWarning className="mr-2 text-3xl text-red-600" />
          <p className="text-[13px] text-red-500">
            This action is irreversible. You will no longer be able to retrieve
            this in the future.
          </p>
        </div>
      </div>
      <div className="flex justify-end py-3 md:py-4">
        <CancelBtn clickEvent={() => setDeleteModal(false)}>
          <p>Cancel</p>
        </CancelBtn>
        <DeleteBtn clickEvent={handleDelete} isDeleting={isDeleting}>
          {isDeleting && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
          {isDeleting ? "Deleting..." : "Delete"}
        </DeleteBtn>
      </div>
    </div>
  );
};

export default DeleteModal;
