import { toast } from "react-toastify";

export function failureToastmessage(message) {
  toast.error(message, {
    position: "bottom-center",
    theme: "dark",
    autoClose: 1500,
    closeOnClick: true,
  });
}