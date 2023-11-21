import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const accessToken = sessionStorage.getItem("accessToken");

  return <>{accessToken ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
