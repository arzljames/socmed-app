import { ReactElement } from "react";

const Overlay = ({
  setIsOverlay,
  children,
}: {
  setIsOverlay?: any;
  children: any;
}): ReactElement => {
  const handleCloseOverlay = () => {
    if (setIsOverlay) {
      setIsOverlay(false);
    }

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
