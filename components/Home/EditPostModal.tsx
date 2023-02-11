import React, { useEffect, useState, useRef } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import TextHeading from "../Custom/Text/TextHeading";
import { FaTimes } from "react-icons/fa";
import { IoCaretDown, IoGlobeOutline, IoPeopleOutline } from "react-icons/io5";
import { updatePost } from "../../utils/api/api";
import useUserData from "../../hooks/useUserData";
import { socket } from "../../utils/socket";
import Error from "next/error";
import CustomLoader from "../Custom/Loader";
import toast from "react-hot-toast";
import TextFeedName from "../Custom/Text/TextFeedName";
import { UserProps } from "../../interface";
import ProfileAvatar from "./ProfileAvatar";

const EditPostModal = ({ data, setIsEditing }: any) => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");
  const [privacyDropdown, setPrivacyDropdown] = useState<boolean>(false);
  const { token, user } = useUserData() as { token: string; user: UserProps };
  const [attachments, setAttachments] = useState<{ type: string; url: string }>(
    { type: "", url: "" }
  );
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
      const res = await updatePost(
        token,
        { privacy, message, attachments },
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
  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-xl bg-white pt-5  shadow-md scrollbar-none md:h-[65%] md:w-1/3">
      <div className="mb-3 px-5">
        <TextHeading>Edit Post</TextHeading>
      </div>
      <div className="mb-4 flex  w-full items-center px-3 ">
        <ProfileAvatar />
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
      </div>
      <div className="sticky bottom-0 flex h-16 w-full items-center justify-end  bg-white px-5">
        <button
          onClick={() => setIsEditing(false)}
          className={`mr-2 flex rounded-lg border px-4 py-2 text-sm text-color-main hover:shadow-lg`}
        >
          Cancel
        </button>
        <button
          onClick={handleUpdatePost}
          className={`flex items-center rounded-lg bg-color-main py-2 px-4 text-sm font-medium text-white duration-100 hover:bg-color-main-dark ${
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
  );
};

export default EditPostModal;
