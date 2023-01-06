import React, { Dispatch, SetStateAction } from "react";

type PostProps = {
  setIsPosting: Dispatch<SetStateAction<Boolean>>;
};

const Post = ({ setIsPosting }: PostProps) => {
  return (
    <div className="flex rounded-md bg-white p-4 shadow-sm">
      <div className="profile mr-2 flex h-10 w-10 items-center justify-center rounded-full border-2">
        AJ
      </div>
      <input
        placeholder="Share your thoughts"
        className="flex-1 border-b-2 px-4 text-sm outline-none"
        type="text"
        onClick={() => setIsPosting(true)}
      />
    </div>
  );
};

export default Post;
