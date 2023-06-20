import { toast } from "react-toastify";

export function successToastmessage(message) {
  toast.success(message, {
    position: "bottom-right",
    theme: "light",
    autoClose: 1500,
    closeOnClick: true,
  });
}