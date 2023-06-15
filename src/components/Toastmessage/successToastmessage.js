import { toast } from "react-toastify";

export function successToastmessage(message) {
  toast.success(message, {
    position: "bottom-center",
    theme: "dark",
    autoClose: 1500,
    closeOnClick: true,
  });
}