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
import { createPosts, uploadCloudinary } from "../../utils/api/api";
import TextFeedName from "../Custom/Text/TextFeedName";
import Error from "next/error";
import CustomLoader from "../Custom/Loader";
import _ from "lodash";
import Overlay from "../Custom/Overlay";
import { UserProps } from "../../interface";
import AttachmentWarningModal from "./AttachmentWarningModal";
import { socket } from "../../utils/socket";
import {
  ATTACHMENT_MAX_SIZE,
  ALLOWED_ATTACHMENT_TYPES,
} from "../../const/index";
import toast from "react-hot-toast";

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
  const [privacy, setPrivacy] = useState<string>("Friends");
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
      // append image to form data as an array
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
      socket.emit("client:refresh_data");
      if (res)
        toast.success("Successfully shared post", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: 14,
          },
        });
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
      return alert("Attachment maximum size is 8mb only");
    if (!_.includes(ALLOWED_ATTACHMENT_TYPES, event.target.files[0]?.type))
      return alert(
        "Attachment file can only be .jpeg, .jpg, .png, .mp4, and .mkv"
      );
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
      <div className="mb-2 flex  w-full items-center ">
        <ProfileAvatar />
        <div className="relative flex flex-col items-start ">
          <TextFeedName>
            {user?.profile?.first_name + " " + user?.profile?.last_name}
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
            <div className="absolute left-0 top-[107%] z-10 min-w-[100px] rounded-md border bg-white py-1 text-xs text-text-sub">
              <div
                onClick={() => {
                  setPrivacy("Friends");
                  setPrivacyDropdown(false);
                }}
                className=" mb-1 flex cursor-pointer items-center px-2 py-2 hover:bg-gray-100 hover:text-text-main "
              >
                <IoPeopleOutline className="mr-1" /> <p>Friends</p>
              </div>
              <div
                onClick={() => {
                  setPrivacy("Public");
                  setPrivacyDropdown(false);
                }}
                className="flex cursor-pointer items-center py-2 px-2 hover:bg-gray-100 hover:text-text-main"
              >
                <IoGlobeOutline className="mr-1" /> <p>Public</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="0 flex flex-1 flex-col md:ml-2 ">
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

        <div className="relative flex w-full items-center justify-end">
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
            className={`flex items-center rounded-full bg-color-main py-1.5 px-4 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !post &&
              !attachments &&
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
