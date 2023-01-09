import { ReactElement, useRef, useState } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import { IoImages, IoFilm, IoSendOutline } from "react-icons/io5";

const WritePost = (): ReactElement => {
  const [post, setPost] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, post);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setPost(val);
  };

  const handlePost = () => {
    if (!post) return;

    alert("Sd");
  };

  return (
    <div className="mb-4 flex w-full rounded-xl bg-white px-3 py-3 shadow-sm">
      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
        AJ
      </div>
      <div className="0 flex flex-1 flex-col  ">
        <textarea
          className=" mb-3 h-10  max-h-32    resize-none overflow-y-scroll rounded-xl  bg-color-bg-light py-3 px-3 text-text-main outline-none placeholder:text-sm"
          placeholder="What's Poppin? Share your thoughts"
          value={post}
          ref={textAreaRef}
          onChange={handleChange}
        ></textarea>
        <div className="flex border-b-[1px] pb-3">
          <button className="mr-2 flex h-8 items-center justify-center rounded-full border border-gray-300 px-3 text-xs font-semibold  ">
            <IoImages className="mr-2 text-[#10ac84]" />
            <p className="text-text-sub">Image</p>
          </button>

          <button className="mr-2 flex h-8 items-center justify-center rounded-full border border-gray-300 px-3 text-xs font-semibold">
            <IoFilm className="mr-2 text-[#0abde3]" />
            <p className="text-text-sub">Video</p>
          </button>
        </div>
        <div className="flex w-full items-center justify-end pt-3">
          <button
            onClick={() => handlePost()}
            className={`flex items-center rounded-md bg-color-main py-1.5 px-3 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !post && "pointer-events-auto cursor-not-allowed opacity-50"
            }`}
          >
            <p className="mr-2">Share</p>
            <IoSendOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
