import { useSession } from "next-auth/react";
import useUserData from "../hooks/useUserData";
import { ReactChildrenProps, SessionProps } from "../interface";
import { useEffect } from "react";
import { GET } from "../api/api";

const Layer = ({ children }: ReactChildrenProps) => {
  const { data: session } = useSession();
  const { setToken, setUser, setPosts } = useUserData() as any;

  useEffect(() => {
    if (session) {
      const { access_token } = session?.user as SessionProps;
      const loggedInUser = async () => {
        const res = await GET("/api/user", access_token);
        setUser(res.data);
        return res;
      };

      const postList = async () => {
        const res = await GET("/api/post", access_token);
        setPosts(res.data);
        return res;
      };

      postList();
      loggedInUser();
      setToken(access_token);
    }
  }, [session]);

  return <div>{children}</div>;
};

export default Layer;
