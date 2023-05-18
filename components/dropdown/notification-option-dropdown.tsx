import { ReactElement, useState } from "react";
import useToast from "../../hooks/useToast";
import { deleteNotification } from "../../utils/api/api";
import useUserData from "../../hooks/useUserData";
import DeleteModal from "../modal/delete-modal";
import Error from "next/error";
import Overlay from "../Custom/Overlay";

const NotificationOptionDropdown = ({
  id,
  status,
}: {
  id: string;
  status: string;
}): ReactElement => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { token } = useUserData() as {
    token: string;
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteNotification(token, id);
      if (res) {
        setIsDeleting(false);
        setDeleteModal(false);
        useToast({
          message: "Successfully deleted notification",
          state: "success",
        });
      }
      return res;
    } catch (error) {
      setIsDeleting(false);
      throw new Error(error);
    }
  };
  return (
    <>
      <div className="notif-option-dropdown absolute right-0 top-[110%] z-10  rounded-lg border bg-white p-1 shadow-sm">
        <p className="flex w-full items-center rounded-md px-2 py-2 text-xs  font-medium text-text-sub hover:bg-slate-100">
          Mark {status.toLowerCase() === "read" ? "unread" : "read"}
        </p>
        <p
          onClick={() => setDeleteModal(true)}
          className="flex items-center rounded-md px-2 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
        >
          Delete
        </p>
        {deleteModal && (
          <Overlay>
            <DeleteModal
              setDeleteModal={setDeleteModal}
              isDeleting={isDeleting}
              handleDelete={handleDelete}
            />
          </Overlay>
        )}
      </div>
    </>
  );
};

export default NotificationOptionDropdown;
