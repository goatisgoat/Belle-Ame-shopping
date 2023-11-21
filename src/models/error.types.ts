import { useNavigate } from "react-router-dom";

export type Errors = {
  sku: boolean;
  name: boolean;
  description: boolean;
  stock: boolean;
  image: boolean;
  price: boolean;
  category: boolean;
  status: boolean;
};

export type UserAuthErrorSlice = {
  payload: {
    error: {
      status: string;
      error: string;
      code: number;
    };
    navigate: ReturnType<typeof useNavigate>;
  };
};

export type ErrorType = {
  status: string;
  error: string;
  code: number;
};

export type RejectedError = {
  specialError?: boolean;
  error: string;
};
