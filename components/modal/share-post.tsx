import React, { useEffect, useState, useRef } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import TextHeading from "../Custom/Text/TextHeading";
import {
  IoCaretDown,
  IoGlobe,
  IoGlobeOutline,
  IoPeople,
  IoPeopleOutline,
} from "react-icons/io5";
import useUserData from "../../hooks/useUserData";
import Error from "next/error";
import CustomLoader from "../Custom/Loader";
import TextFeedName from "../Custom/Text/TextFeedName";
import { UserProps } from "../../interface";
import _ from "lodash";
import OwnAvatar from "../avatar/own-avatar";
import OtherProfileAvatar from "../avatar/user-avatar";
import TextFeedUsername from "../Custom/Text/TextFeedUsername";
import TextParagraph from "../Custom/Text/TextFeedParagraph";
import useToast from "../../hooks/useToast";
import { createPosts } from "../../utils/api/api";
import CancelBtn from "../button/cancel-btn";

const EditPostModal = ({ data, setIsSharing }: any) => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("Followers");
  const [privacyDropdown, setPrivacyDropdown] = useState<boolean>(false);
  const { token, user } = useUserData() as {
    token: string;
    user: Partial<UserProps>;
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  // handler for sharing post
  const handleSharePost = async () => {
    // to prevent double posting
    if (isPosting) return;
    setIsPosting(true);
    try {
      const res = await createPosts(token, {
        message: message,
        privacy,
        post: data._id,
      });
      setMessage("");
      setIsPosting(false);
      if (res)
        useToast({ message: "Successfully shared post", state: "success" });
      setIsSharing(false);
      return res;
    } catch (error) {
      setIsPosting(false);
      throw new Error(error);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="scrollbar-none relative h-[85%] min-h-[400px] w-full overflow-hidden rounded-xl bg-white pt-5  shadow-md md:h-[65%] md:min-h-[500px] md:w-1/3"
    >
      <div className="mb-3 flex items-center justify-center border-b px-5 pb-3">
        <TextHeading>Share Post</TextHeading>
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

        <div className="relative z-0 mb-4 mt-4 flex w-full flex-col rounded-xl  border bg-white py-3 shadow-md  md:py-4">
          <div className="flex px-3 md:px-6">
            {data.author._id === user._id ? (
              <OwnAvatar showStatus={true} />
            ) : (
              <OtherProfileAvatar
                initials={data.author?.profile?.initials}
                profile_color={data.author?.profile?.profile_color}
                profile_picture={data.author?.profile?.profile_photo}
              />
            )}

            <div className="0 flex flex-1 flex-col  ">
              <div className="mb-4">
                <div className="flex items-baseline">
                  <div className="mr-1">
                    <TextFeedName>
                      {data.author?.profile.first_name +
                        " " +
                        data.author?.profile.last_name}{" "}
                    </TextFeedName>
                  </div>
                </div>

                <div className="mt-[1px] flex items-center text-xs text-text-sub">
                  {data.privacy === "Followers" ? (
                    <IoPeople className="mr-1" />
                  ) : (
                    <IoGlobe className="mr-1" />
                  )}
                  <TextFeedUsername>@{data.author.username}</TextFeedUsername>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 px-3 md:px-6">
              <TextParagraph>{data.message}</TextParagraph>
            </div>
            {data?.attachments?.url && (
              <div className="mb-2 flex items-center justify-center">
                {data?.attachments.type === "video/mp4" ||
                data?.attachments.type === "video/x-matroska" ? (
                  <video
                    className="w-full cursor-pointer object-cover"
                    src={data?.attachments?.url}
                    controls
                  />
                ) : (
                  <img
                    className="w-full cursor-pointer object-cover"
                    src={data?.attachments?.url}
                    alt="attachment"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex  h-16 w-full items-center justify-end  bg-white px-5">
        <div className="flex ">
          <CancelBtn clickEvent={() => setIsSharing(false)}>
            <p>Cancel</p>
          </CancelBtn>
          <button
            onClick={handleSharePost}
            className={`flex items-center  rounded-lg bg-color-main px-4 py-2  text-sm font-medium text-white duration-100 hover:bg-color-main-dark`}
          >
            {isPosting && <CustomLoader h="15" w="15" c="#fff" m="mr-2" />}
            {isPosting ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
