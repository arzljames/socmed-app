import { toast } from "react-hot-toast";

interface IToast {
  message: string;
  state: "success" | "error";
}

const toastStyling = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
    fontSize: 14,
  },
};

const useToast = ({ message = "", state = "success" }: IToast) => {
  if (state === "success") return toast.success(message, toastStyling);
  if (state === "error") return toast.error(message, toastStyling);
};

export default useToast;
