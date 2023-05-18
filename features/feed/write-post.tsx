import { ReactElement, useRef, useState } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import {
  IoCamera,
  IoCaretDown,
  IoCaretForward,
  IoGlobeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import useUserData from "../../hooks/useUserData";
import { createPosts, uploadCloudinary } from "../../utils/api/api";
import Error from "next/error";
import _ from "lodash";
import { UserProps } from "../../interface";
import { socket } from "../../utils/socket";
import {
  ATTACHMENT_MAX_SIZE,
  ALLOWED_ATTACHMENT_TYPES,
} from "../../const/index";
import useToast from "../../hooks/useToast";
import OwnAvatar from "../../components/avatar/own-avatar";
import TextFeedName from "../../components/Custom/Text/TextFeedName";
import CustomLoader from "../../components/Custom/Loader";
import Overlay from "../../components/Custom/Overlay";
import AttachmentWarningModal from "../../components/modal/attachement-warning";

const WritePost = (): ReactElement => {
  const [post, setPost] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [previewFull, setPreviewFull] = useState<{
    isPreview: Boolean;
    fileToPreview: File;
  }>({
    isPreview: false,
    fileToPreview: null,
  });
  const [privacyDropdown, setPrivacyDropdown] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<string>("Followers");
  const [attachments, setAttachments] = useState<File | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user, token, attachmentWarning, setPosts } = useUserData() as {
    user: UserProps;
    token: string;
    attachmentWarning: boolean;
    setPosts: any;
  };

  useAutosizeTextArea(textAreaRef.current, post);

  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onBtnClick = () => {
    if (inputTextAreaRef.current) {
      inputTextAreaRef.current.focus();
    }
  };

  const onInputFileRefClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setPost(val);
  };

  // handler for submitting post
  const handleSubmitPost = async () => {
    // to prevent double posting
    if (isPosting) return;
    if (!post && !attachments) return;
    setIsPosting(true);
    try {
      let url: string = "";
      if (attachments) url = await uploadCloudinary(attachments);
      const res = await createPosts(token, {
        message: post,
        privacy,
        attachments: url && {
          url,
          type: attachments?.type,
        },
      });
      setPost("");
      setAttachments(null);
      setIsPosting(false);
      if (res)
        useToast({ message: "Successfully shared post", state: "success" });
      return res;
    } catch (error) {
      setIsPosting(false);
      throw new Error(error);
    }
  };

  // handler for removing attachment
  const handleRemoveAttachment = () => {
    inputFileRef.current.value = null;
    setAttachments(null);
  };

  // handler for adding attachment
  // validation for type and size attachment
  const handleAddAttachement = (event: any) => {
    if (event.target.files[0]?.size > ATTACHMENT_MAX_SIZE)
      return useToast({
        message: "Attachment maximum size is 8mb only",
        state: "error",
      });

    if (!_.includes(ALLOWED_ATTACHMENT_TYPES, event.target.files[0]?.type))
      return useToast({
        message:
          "Attachment file can only be .jpeg, .jpg, .png, .mp4, and .mkv",
        state: "error",
      });

    setAttachments(event.target.files[0]);
    if (attachmentWarning) {
      setWarning(true);
    }
  };

  const handleViewFullSize = (file: File) => {
    setPreviewFull({ isPreview: true, fileToPreview: file });
  };

  return (
    <div
      onClick={() => onBtnClick()}
      className="mb-4 flex w-full flex-col rounded-xl bg-white  px-3 py-3 shadow-sm  md:px-6 md:py-4"
    >
      <div className=" z-0 mb-4 flex w-full items-center ">
        <OwnAvatar />
        <div className="relative flex flex-col items-start ">
          <TextFeedName>
            {user?.profile?.first_name + " " + user?.profile?.last_name}
          </TextFeedName>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPrivacyDropdown(!privacyDropdown);
            }}
            className={`mt-1 flex cursor-pointer items-center rounded-md bg-gray-100 py-1 px-2 hover:bg-gray-200 ${
              privacyDropdown && "bg-gray-200"
            }`}
          >
            <p className="mr-1 select-none text-xs text-text-sub">{privacy}</p>
            {privacyDropdown ? (
              <IoCaretForward className="text-xs  text-text-main" />
            ) : (
              <IoCaretDown className="text-xs  text-text-main" />
            )}
          </div>
          {privacyDropdown && (
            <div className="absolute left-0 top-[107%]  z-auto min-w-[100px] rounded-md border bg-white p-1 text-xs text-text-sub">
              <div
                onClick={() => {
                  setPrivacy("Followers");
                  setPrivacyDropdown(false);
                }}
                className="mb-1 flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-gray-100 hover:text-text-main "
              >
                <IoPeopleOutline className="mr-1" /> <p>Followers</p>
              </div>
              <div
                onClick={() => {
                  setPrivacy("Public");
                  setPrivacyDropdown(false);
                }}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-gray-100 hover:text-text-main "
              >
                <IoGlobeOutline className="mr-1" /> <p>Public</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col md:ml-2 ">
        <textarea
          className="my-2 resize-none border border-none text-sm text-text-main outline-none   placeholder:text-sm placeholder:font-light  "
          placeholder="What's Poppin? Share thoughts"
          value={post}
          rows={1}
          ref={textAreaRef}
          onChange={handleChange}
        ></textarea>

        {attachments && (
          <div className="mt-2 flex flex-wrap">
            <div
              onClick={() => handleViewFullSize(attachments)}
              className=" relative mb-2 mr-2 flex h-24 w-24 cursor-pointer  items-center justify-center rounded-lg border bg-white shadow-md"
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAttachment();
                }}
                className="absolute top-[-8px] right-[-8px] z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-color-main text-xs text-white duration-100  hover:bg-color-main-dark"
              >
                <FaTimes />
              </span>
              {attachments.type === "video/mp4" ||
              attachments.type === "video/x-matroska" ? (
                <video
                  className="w-ful flex h-full rounded-lg object-fill object-center"
                  src={URL.createObjectURL(attachments)}
                  controls
                />
              ) : (
                <img
                  className="w-ful flex h-full rounded-lg object-fill object-center"
                  src={URL.createObjectURL(attachments)}
                  alt={attachments.name}
                />
              )}
            </div>
          </div>
        )}

        <div className="z-[-1] mt-2 flex items-center justify-end ">
          <input
            ref={inputFileRef}
            type="file"
            className="pointer-events-none hidden"
            onInput={(event) => {
              handleAddAttachement(event);
            }}
          />
          <div
            onClick={onInputFileRefClick}
            className="mr-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-lg text-color-main duration-75 ease-in-out hover:bg-slate-200"
          >
            <IoCamera />
          </div>

          <button
            onClick={handleSubmitPost}
            className={`flex items-center  rounded-full bg-color-main py-1.5 px-4 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !post &&
              !attachments &&
              "pointer-events-auto cursor-not-allowed opacity-50 hover:bg-color-main"
            } ${
              isPosting &&
              "pointer-events-auto cursor-not-allowed opacity-50 hover:bg-color-main"
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
            {attachments.type === "video/mp4" ||
            attachments.type === "video/x-matroska" ? (
              <video
                className="w-ful flex h-full rounded-lg object-fill object-center"
                src={URL.createObjectURL(attachments)}
                controls
              />
            ) : (
              <img
                className="w-ful flex h-full rounded-lg object-fill object-center"
                src={URL.createObjectURL(attachments)}
                alt={attachments.name}
              />
            )}
          </div>
        </Overlay>
      )}

      {warning && (
        <Overlay setWarning={setWarning}>
          <AttachmentWarningModal setWarning={setWarning} />
        </Overlay>
      )}
    </div>
  );
};

export default WritePost;
