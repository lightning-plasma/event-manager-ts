import { toast, Flip, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip,
};

export const success = (message : string, options: ToastOptions = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const info = (message : string, options: ToastOptions = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const warn = (message : string, options: ToastOptions = {}) => {
  toast.warn(message, { ...defaultOptions, ...options });
};

export const error = (message : string, options: ToastOptions = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};
