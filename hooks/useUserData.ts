import { useContext } from "react";
import UserDataContext from "../context/user.context";

const useUserData = () => {
  return useContext(UserDataContext);
};

export default useUserData;
