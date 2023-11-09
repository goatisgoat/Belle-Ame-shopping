import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const GlobalLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <Outlet />
    </MainContainer>
  );
};

export default GlobalLayout;

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px;
`;
