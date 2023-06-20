import { toast } from "react-toastify";

export function failureToastmessage(message) {
  toast.error(message, {
    position: "bottom-right",
    theme: "light",
    autoClose: 1500,
    closeOnClick: true,
  });
}