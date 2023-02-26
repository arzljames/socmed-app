import React, { useEffect, useState, useRef } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import TextHeading from "../Custom/Text/TextHeading";
import { FaTimes } from "react-icons/fa";
import {
  IoCaretDown,
  IoGlobeOutline,
  IoPeopleOutline,
  IoCamera,
} from "react-icons/io5";
import { updatePost, uploadCloudinary } from "../../utils/api/api";
import useUserData from "../../hooks/useUserData";
import { socket } from "../../utils/socket";
import Error from "next/error";
import CustomLoader from "../Custom/Loader";
import toast from "react-hot-toast";
import TextFeedName from "../Custom/Text/TextFeedName";
import { UserProps } from "../../interface";
import { ALLOWED_ATTACHMENT_TYPES, ATTACHMENT_MAX_SIZE } from "../../const";
import _ from "lodash";
import OwnAvatar from "../avatar/own-avatar";

const EditPostModal = ({ data, setIsEditing }: any) => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");
  const [privacyDropdown, setPrivacyDropdown] = useState<boolean>(false);
  const { token, user } = useUserData() as { token: string; user: UserProps };
  const [attachments, setAttachments] = useState<{ type: string; url: string }>(
    { type: "", url: "" }
  );
  const [newAttachments, setNewAttachments] = useState<File>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, message);

  useEffect(() => {
    setMessage(data.message);
    setAttachments(data.attachments);
    setPrivacy(data.privacy);
  }, []);

  const handleUpdatePost = async () => {
    // to prevent double posting
    if (isPosting) return;
    if (!message && !attachments?.url) return;
    setIsPosting(true);
    try {
      let url: string = "";
      if (newAttachments) url = await uploadCloudinary(newAttachments);
      const res = await updatePost(
        token,
        {
          privacy,
          message,
          attachments: newAttachments
            ? { type: newAttachments.type, url }
            : attachments,
        },
        data._id
      );
      socket.emit("client:refresh_data");
      setIsPosting(false);
      setIsEditing(false);
      if (res)
        toast.success("Successfully updated post", {
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
      toast.error("Encoutered an error");
      throw new Error(error);
    }
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onInputFileRefClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  // handler for adding attachment
  // validation for type and size attachment
  const handleAddAttachement = (event: any) => {
    if (event.target.files[0]?.size > ATTACHMENT_MAX_SIZE)
      return toast.error("Attachment maximum size is 8mb only", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontSize: 14,
        },
      });
    if (!_.includes(ALLOWED_ATTACHMENT_TYPES, event.target.files[0]?.type))
      return toast.error(
        "Attachment file can only be .jpeg, .jpg, .png, .mp4, and .mkv",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: 14,
          },
        }
      );
    setNewAttachments(event.target.files[0]);
  };

  return (
    <div className="relative h-[85%] min-h-[400px] w-full overflow-hidden rounded-xl bg-white pt-5 shadow-md  scrollbar-none md:h-[65%] md:min-h-[500px] md:w-1/3">
      <div className="mb-3 flex items-center justify-center border-b px-5 pb-3">
        <TextHeading>Edit Post</TextHeading>
      </div>
      <div className="mb-4 flex  w-full items-center px-3 ">
        <OwnAvatar />
        <div className="relative flex flex-col items-start">
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
                  setPrivacy("Followers");
                  setPrivacyDropdown(false);
                }}
                className=" mb-1 flex cursor-pointer items-center px-2 py-2 hover:bg-gray-100 hover:text-text-main "
              >
                <IoPeopleOutline className="mr-1" /> <p>Followers</p>
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
      <div className="h-full w-full overflow-y-scroll px-5 pb-48">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" w-full resize-none border border-none   text-sm text-text-main  outline-none  placeholder:text-sm placeholder:font-light  "
          placeholder="What's Poppin? Share thoughts"
          rows={1}
          ref={textAreaRef}
        />

        {attachments?.type && (
          <div className="relative mt-2 flex items-center justify-center">
            {attachments.type === "video/mp4" ||
            attachments.type === "video/x-matroska" ? (
              <video
                className="w-full cursor-pointer rounded-xl border object-cover"
                src={attachments.url}
                controls
              />
            ) : (
              <img
                className="w-full cursor-pointer rounded-xl border object-cover"
                src={attachments.url}
                alt="attachment"
              />
            )}

            <span
              onClick={(e) => {
                e.stopPropagation();
                setAttachments({ type: "", url: "" });
              }}
              className="absolute top-[-8px] right-[-8px] z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-color-main text-xs text-white duration-100  hover:bg-color-main-dark"
            >
              <FaTimes />
            </span>
          </div>
        )}

        {newAttachments?.type && (
          <div className="relative mt-2 flex items-center justify-center">
            {newAttachments.type === "video/mp4" ||
            newAttachments.type === "video/x-matroska" ? (
              <video
                className="w-full cursor-pointer rounded-xl border object-cover"
                src={URL.createObjectURL(newAttachments)}
                controls
              />
            ) : (
              <img
                className="w-full cursor-pointer rounded-xl border object-cover"
                src={URL.createObjectURL(newAttachments)}
                alt="attachment"
              />
            )}

            <span
              onClick={(e) => {
                e.stopPropagation();
                setNewAttachments(null);
              }}
              className="absolute top-[-8px] right-[-8px] z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-color-main text-xs text-white duration-100  hover:bg-color-main-dark"
            >
              <FaTimes />
            </span>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 flex  h-16 w-full items-center justify-between  bg-red-50 px-5">
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
          className={`mr-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-lg text-color-main duration-75 ease-in-out hover:bg-slate-200 ${
            (attachments?.url || newAttachments?.type) &&
            "pointer-events-none opacity-50"
          }`}
        >
          <IoCamera />
        </div>
        <div className="flex ">
          <button
            onClick={() => setIsEditing(false)}
            className={`mr-2 flex rounded-lg border px-4 py-2 text-sm text-color-main hover:shadow-lg`}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdatePost}
            className={`flex items-center  rounded-lg bg-color-main px-4 py-2  text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
              !message &&
              !attachments?.url &&
              "pointer-events-auto cursor-not-allowed opacity-50"
            }`}
          >
            {isPosting && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
            {isPosting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
