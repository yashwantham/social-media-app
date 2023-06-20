import { toast } from "react-toastify";

export function warningToastmessage(message) {
  toast.warn(message, {
    position: "bottom-right",
    theme: "light",
    autoClose: 1500,
    closeOnClick: true,
  });
}