import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

const Overlay = ({
  setIsOverlay,
  setDeleteModal,
  setIsPreview,
  setOverlay,
  setWarning,
  children,
}: {
  setIsOverlay?: Dispatch<SetStateAction<boolean>>;
  setDeleteModal?: Dispatch<SetStateAction<boolean>>;
  setWarning?: Dispatch<SetStateAction<boolean>>;
  setOverlay?: any;
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
    if (setWarning) setWarning(false);
    if (setIsPreview) setIsPreview({ isPreview: false, fileToPreview: null });
    if (setOverlay) setOverlay();
    return;
  };
  return (
    <div
      onClick={handleCloseOverlay}
      className="fixed top-0 left-0 z-30 flex h-screen w-screen cursor-auto items-center justify-center  bg-[#bebebe75] p-3   backdrop-blur-sm"
    >
      {children}
    </div>
  );
};

export default Overlay;
