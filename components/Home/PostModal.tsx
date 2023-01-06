import { ReactElement } from "react";
import { Dispatch, SetStateAction } from "react";
import { IoSend, IoImage } from "react-icons/io5";

type PostModalProps = {
  setIsPosting: Dispatch<SetStateAction<Boolean>>;
};

const PostModal = ({ setIsPosting }: PostModalProps): ReactElement => {
  return (
    <div
      onClick={() => setIsPosting(false)}
      className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-5 px-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-auto w-full rounded-lg bg-white px-2 py-2 shadow-md"
      >
        <div className="profile mr-2 flex h-10 w-10 items-center justify-center rounded-full border-2">
          AJ
        </div>
        <div className="flex-1">
          <textarea placeholder="Share your thoughts" className="w-full" />
          <div className="flex items-center  justify-between border-t-2 py-2 pb-0">
            <IoImage fontSize={18} className="text-[#385E72]" />
            <button className="flex items-center rounded-3xl bg-[#385E72] py-2 px-3 text-white">
              <p className="mr-2 text-sm">Share</p>
              <IoSend fontSize={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
