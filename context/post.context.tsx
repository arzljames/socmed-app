import { AxiosResponse } from "axios";
import { createContext, useState } from "react";
import { ReactChildrenProps } from "../interface";

const PostDataContext = createContext({});

export const PostDataProvider = ({ children }: ReactChildrenProps) => {
  const [post, setPost] = useState([]);
  return (
    <PostDataContext.Provider value={{ post, setPost }}>
      {children}
    </PostDataContext.Provider>
  );
};

export default PostDataContext;
