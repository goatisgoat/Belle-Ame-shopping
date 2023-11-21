import { NavigateFunction } from "react-router-dom";
import { createToastify } from "../redux/modules/toastifySlice";
import { deleteInfo } from "../redux/modules/userSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

let isTokenErrorHandled = false;

export const handleApiError = async (
  message: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  navigate: NavigateFunction
) => {
  if (!isTokenErrorHandled) {
    dispatch(
      createToastify({
        status: "error",
        message: message,
      })
    );

    dispatch(deleteInfo({}));
    isTokenErrorHandled = true; // 한 번 처리되었음을 표시
    navigate("/login");
    return;
  }
};

export const resetTokenErrorHandled = () => {
  isTokenErrorHandled = false;
};
