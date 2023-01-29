import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

const Overlay = ({
  setIsOverlay,
  setDeleteModal,
  setIsPreview,
  children,
}: {
  setIsOverlay?: Dispatch<SetStateAction<Boolean>>;
  setDeleteModal?: Dispatch<SetStateAction<Boolean>>;
  setIsPreview?: Dispatch<
    SetStateAction<{
      isPreview: Boolean;
      fileToPreview: File;
    }>
  >;
  children: ReactNode;
}): ReactElement => {
  const handleCloseOverlay = () => {
    if (setIsOverlay) setIsOverlay(false);
    if (setDeleteModal) setDeleteModal(false);
    if (setIsPreview) setIsPreview({ isPreview: false, fileToPreview: null });
    return;
  };
  return (
    <div
      onClick={handleCloseOverlay}
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center overflow-y-scroll bg-[#e0e0e075] p-3 backdrop-blur-sm"
    >
      {children}
    </div>
  );
};

export default Overlay;
