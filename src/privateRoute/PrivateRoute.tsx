import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const storedToken = sessionStorage.getItem("token");

  return <>{storedToken ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
