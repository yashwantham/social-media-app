import { toast } from "react-toastify";

export function warningToastmessage(message) {
  toast.warn(message, {
    position: "bottom-center",
    theme: "dark",
    autoClose: 1500,
    closeOnClick: true,
  });
}