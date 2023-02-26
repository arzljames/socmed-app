import React, { Dispatch, SetStateAction } from "react";
import { IoWarning } from "react-icons/io5";
import CustomLoader from "../Custom/Loader";
import TextHeading from "../Custom/Text/TextHeading";

interface IDeleteModal {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  isDeleting: boolean;
  handleDeletePost: any;
}

const DeletePostModal = ({
  setDeleteModal,
  isDeleting,
  handleDeletePost,
}: IDeleteModal) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-xl bg-white p-5 shadow-md md:w-1/3"
    >
      <TextHeading>Delete Post</TextHeading>
      <div className="my-5">
        <p className="mb-2 text-sm text-text-main">
          Are you really sure you want to delete this post?
        </p>
        <div className="flex items-center rounded-l-sm rounded-r-md border-l-2 border-red-500 bg-red-100 p-3">
          <IoWarning className="mr-2 text-3xl text-red-600" />
          <p className="text-[13px] text-red-500">
            This action is irreversible. You will no longer be able to retrieve
            this in the future.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setDeleteModal(false)}
          className="mr-2 rounded-lg border px-3 py-2 text-sm duration-100 ease-in-out hover:shadow-md"
        >
          Cancel
        </button>
        <button
          onClick={handleDeletePost}
          className={`flex rounded-lg border bg-red-500 px-3 py-2 text-sm text-white ${
            isDeleting && "pointer-events-none opacity-50"
          } duration-100 ease-in-out hover:bg-red-600`}
        >
          {isDeleting && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
