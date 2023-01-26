import { ReactElement, useRef, useState } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import { IoCamera, IoDocument, IoCaretDown } from "react-icons/io5";
import ProfileAvatar from "./ProfileAvatar";
import useUserData from "../../hooks/useUserData";
import { POST } from "../../api/api";
import { useRouter } from "next/router";
import TextFeedName from "../Custom/Text/TextFeedName";
import useRefreshData from "../../hooks/useRefreshData";
import { IoPeopleOutline, IoGlobeOutline } from "react-icons/io5";
import Error from "next/error";

const WritePost = (): ReactElement => {
  const [post, setPost] = useState<string>("");
  const [privacyDropdown, setPrivacyDropdown] = useState<Boolean>(false);
  const [privacy, setPrivacy] = useState<string>("Friends");
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
    try {
      const res = await POST("/api/post/create", user.access_token, {
        message: post,
        author: user._id,
        privacy,
      });

      useRefreshData(router);
      setPost("");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="mb-4 flex w-full flex-col rounded-xl bg-white  px-3 py-3 shadow-sm  md:px-6 md:py-4">
      <div className="mb-2 flex  w-full items-center ">
        <ProfileAvatar />
        <div className="relative flex flex-col items-start ">
          <TextFeedName>
            {user.profile.first_name + " " + user.profile.last_name}
          </TextFeedName>
          <div
            onClick={() => setPrivacyDropdown(!privacyDropdown)}
            className=" mt-1 flex cursor-pointer items-center rounded-md bg-gray-100 py-1 px-2 hover:bg-gray-200"
          >
            <p className=" mr-1 text-xs text-text-sub">{privacy}</p>
            <IoCaretDown className="text-xs  text-text-main" />
          </div>
          {privacyDropdown && (
            <div className="absolute left-0 top-[107%] rounded-md border bg-white  py-1 text-xs text-text-sub">
              <div
                onClick={() => {
                  setPrivacy("Friends");
                  setPrivacyDropdown(false);
                }}
                className="mb-1 flex cursor-pointer items-center px-2 py-1 hover:bg-gray-100 hover:text-text-main "
              >
                <IoPeopleOutline className="mr-1" /> <p>Friends</p>
              </div>
              <div
                onClick={() => {
                  setPrivacy("Public");
                  setPrivacyDropdown(false);
                }}
                className="flex cursor-pointer items-center py-1 px-2 hover:bg-gray-100 hover:text-text-main"
              >
                <IoGlobeOutline className="mr-1" /> <p>Public</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="0 flex flex-1 flex-col md:ml-2 ">
        <textarea
          className="mb-2  max-h-20 resize-none rounded-xl border border-none   py-2   px-3  text-sm text-text-main  outline-none duration-100 ease-in-out  placeholder:text-sm placeholder:font-light  "
          placeholder="What's Poppin? Share thoughts"
          value={post}
          ref={textAreaRef}
          onChange={handleChange}
        ></textarea>

        <div className="flex w-full items-center justify-end">
          <div className="mr-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-lg text-color-main duration-75 ease-in-out hover:bg-slate-200">
            <IoCamera />
          </div>
          <div className="mr-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-lg text-color-main duration-75 ease-in-out hover:bg-slate-200">
            <IoDocument />
          </div>
          <button
            onClick={handleSubmitPost}
            className={`flex items-center rounded-full bg-color-main py-1.5 px-4 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !post && "pointer-events-auto cursor-not-allowed opacity-50"
            }`}
          >
            <p>Share</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
