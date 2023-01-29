import { useContext } from "react";
import UserDataContext from "../context/user.context";

// Fetch global state data using context API
const useUserData = () => {
  return useContext(UserDataContext);
};

export default useUserData;
