import { ReactElement, useRef, useState, useEffect } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import {
  IoCamera,
  IoCaretDown,
  IoGlobeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import ProfileAvatar from "./ProfileAvatar";
import useUserData from "../../hooks/useUserData";
import { POST } from "../../api/api";
import { useRouter } from "next/router";
import TextFeedName from "../Custom/Text/TextFeedName";
import useRefreshData from "../../hooks/useRefreshData";
import Error from "next/error";
import CustomLoader from "../Custom/Loader";
import _ from "lodash";
import { ALLOWED_ATTACHMENT_TYPES } from "../../const";
import Overlay from "../Custom/Overlay";
import GenerateId from "../../utils/GenerateId";

const WritePost = (): ReactElement => {
  const [post, setPost] = useState<string>("");
  const [isPosting, setIsPosting] = useState<Boolean>(false);
  const [previewFull, setPreviewFull] = useState<{
    isPreview: Boolean;
    fileToPreview: File;
  }>({
    isPreview: false,
    fileToPreview: null,
  });
  const [privacyDropdown, setPrivacyDropdown] = useState<Boolean>(false);
  const [privacy, setPrivacy] = useState<string>("Friends");
  const [attachments, setAttachments] = useState<any[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user, token } = useUserData() as any;

  useAutosizeTextArea(textAreaRef.current, post);

  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputTextAreaRef.current) {
      inputTextAreaRef.current.focus();
    }
  };

  const onInputFileRefClick = () => {
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

  // handler for submitting post
  const handleSubmitPost = async () => {
    // to prevent double posting
    if (isPosting) return;

    // setIsPosting(true);
    try {
      // append image to form data as an array
      let attachmentFiles = [];

      for (let i = 0; i < attachments.length; i++) {
        attachmentFiles.push(attachments[i].image);
      }

      const res = await POST("/api/post/create", token, {
        message: post,
        author: user._id,
        privacy,
        attachments: attachmentFiles,
      });
      useRefreshData(router);
      setPost("");
      setAttachments([]);
      setIsPosting(false);
      return res;
    } catch (error) {
      setIsPosting(false);
      throw new Error(error);
    }
  };

  // handler for removing attachment
  const handleRemoveAttachment = (id: string) => {
    setAttachments(
      _.filter(attachments, (file: any) => {
        return file.id !== id;
      })
    );
  };

  // handler for removing attachment
  const handleAddAttachement = (event: any) => {
    let filesArr: any = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (!_.includes(ALLOWED_ATTACHMENT_TYPES, event.target.files[i].type))
        return alert("Only .jpeg, .png, and .jpg type of files are allowed.");
      filesArr.push({ image: event.target.files[i], id: GenerateId() });
    }
    setAttachments([...attachments, ...filesArr]);
  };

  const handleViewFullSize = (file: File) => {
    setPreviewFull({ isPreview: true, fileToPreview: file });
  };

  return (
    <div
      onClick={() => onBtnClick()}
      className="mb-4 flex w-full flex-col rounded-xl bg-white  px-3 py-3 shadow-sm  md:px-6 md:py-4"
    >
      <div className="mb-2 flex  w-full items-center ">
        <ProfileAvatar />
        <div className="relative flex flex-col items-start ">
          <TextFeedName>
            {user.profile.first_name + " " + user.profile.last_name}
          </TextFeedName>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPrivacyDropdown(!privacyDropdown);
            }}
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
          className="my-2 mb-6  max-h-20 resize-none  border border-none     text-sm text-text-main  outline-none duration-100 ease-in-out  placeholder:text-sm placeholder:font-light  "
          placeholder="What's Poppin? Share thoughts"
          value={post}
          ref={textAreaRef}
          onChange={handleChange}
        ></textarea>
        {!_.isEmpty(attachments) && (
          <div className="flex flex-wrap">
            {_.map(attachments, (image: any, index: number) => {
              return (
                <div
                  onClick={() => handleViewFullSize(image.image)}
                  className="group relative mb-2 mr-2 flex h-24 w-24 cursor-pointer  items-center justify-center rounded-lg border bg-white shadow-md"
                  key={index}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAttachment(image.id);
                    }}
                    className="absolute top-[-8px] right-[-8px] hidden h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-color-main text-xs text-white duration-100 group-hover:flex hover:bg-color-main-dark"
                  >
                    <FaTimes />
                  </span>
                  <img
                    className="w-ful flex h-full rounded-lg object-fill object-center"
                    src={URL.createObjectURL(image.image)}
                    alt={image.name}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="relative flex w-full items-center justify-end">
          <input
            ref={inputFileRef}
            type="file"
            className="pointer-events-none hidden"
            onChange={(event) => {
              handleAddAttachement(event);
            }}
            multiple
          />
          <div
            onClick={onInputFileRefClick}
            className="mr-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-lg text-color-main duration-75 ease-in-out hover:bg-slate-200"
          >
            <IoCamera />
          </div>

          <button
            onClick={handleSubmitPost}
            className={`flex items-center rounded-full bg-color-main py-1.5 px-4 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !post &&
              _.isEmpty(attachments) &&
              "pointer-events-auto cursor-not-allowed opacity-50"
            }`}
          >
            {isPosting && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
            {isPosting ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>

      {previewFull.isPreview && (
        <Overlay setIsPreview={setPreviewFull}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md rounded-lg  shadow-2xl"
          >
            <img
              className="rounded-lg"
              src={URL.createObjectURL(previewFull.fileToPreview)}
              alt={previewFull.fileToPreview.name}
            />
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default WritePost;
