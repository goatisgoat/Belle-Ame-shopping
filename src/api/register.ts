import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { useNavigate } from "react-router-dom";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType } from "../models/error.types";

export const register = createAsyncThunk(
  "register",
  async (
    registerData: {
      email: string | undefined;
      name: string | undefined;
      password: string | undefined;
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
      navigate: ReturnType<typeof useNavigate>;
    },
    { dispatch }
  ) => {
    try {
      const { email, name, password, setIsChecked, navigate } = registerData;
      const response = await api.post("/user", { email, name, password });

      if (response.status !== 200) {
        throw response;
      }
      setIsChecked(false);

      dispatch(
        createToastify({
          status: "success",
          message: "회원가입이 완료되었습니다.",
        })
      );

      navigate("/login");
    } catch (error) {
      const typeError = error as ErrorType;

      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
