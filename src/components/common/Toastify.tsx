import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/config/ConfigStore";

const Toastify = () => {
  const { toastMessage } = useSelector((state: RootState) => state.toastify);

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;

      if (message !== "" && status === "error") {
        toast.error(message, { theme: "colored" });
      } else if (message !== "" && status === "success") {
        toast.success(message, { theme: "colored" });
      }
    }
  }, [toastMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{ zIndex: 99999999 }}
    />
  );
};

export default Toastify;
