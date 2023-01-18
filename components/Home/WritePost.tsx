import { ReactElement, useRef, useState } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import { IoImages, IoFilm, IoSendOutline } from "react-icons/io5";
import ProfileAvatar from "./ProfileAvatar";
import useUserData from "../../hooks/useUserData";
import { api } from "../../api/api";
import { useRouter } from "next/router";
import TextFeedName from "../Custom/Text/TextFeedName";
import useRefreshData from "../../hooks/useRefreshData";

const WritePost = (): ReactElement => {
  const [post, setPost] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUserData() as any;

  useAutosizeTextArea(textAreaRef.current, post);

  const inputFileRef = useRef<HTMLDivElement>(null);
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const router = useRouter();

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setPost(val);
  };

  const handleSubmitPost = async () => {
    const res = await api.post("/api/post/create", {
      message: post,
      author: user._id,
    });

    useRefreshData(router);
    setPost("");
    return res;
  };

  return (
    <div className="mb-4 flex w-full rounded-xl bg-white px-3 py-3 shadow-sm md:px-6  md:py-4">
      <div className="flex w-full">
        <ProfileAvatar />
        <div className="0 flex flex-1 flex-col md:ml-2 ">
          <div className="mb-4">
            <TextFeedName>Arzl James Lao</TextFeedName>
          </div>
          <textarea
            className="hover:to-color-bg-light mb-3 h-[50px] max-h-32 resize-none overflow-y-scroll    rounded-xl  border py-3  px-3 text-text-main outline-none duration-100 ease-in-out placeholder:text-sm focus:border focus:border-color-border  hover:border "
            placeholder="What's Poppin?"
            value={post}
            ref={textAreaRef}
            onChange={handleChange}
          ></textarea>
          <div className="flex  pb-3">
            <button className="mr-2 flex h-8 items-center justify-center rounded-full border border-gray-300 px-3 text-xs font-semibold  ">
              <IoImages className="mr-2 text-[#10ac84]" />
              <p className="text-text-sub">Image</p>
            </button>

            <input type="file" className="hidden" />

            <button className="mr-2 flex h-8 items-center justify-center rounded-full border border-gray-300  px-3 text-xs font-semibold">
              <IoFilm className="mr-2 text-[#0abde3]" />
              <p className="text-text-sub">Video</p>
            </button>
          </div>
          {post && (
            <div className="flex w-full items-center justify-end border-t-[1px] pt-3">
              <button
                className={`flex items-center rounded-md bg-color-main py-1.5 px-3 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
                  !post && "pointer-events-auto cursor-not-allowed opacity-50"
                }`}
              >
                <p onClick={handleSubmitPost} className="mr-2">
                  Share
                </p>
                <IoSendOutline />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritePost;
