import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const GlobalLayout = () => {
  const location = useLocation();
  const [ignoreNavbar, setIgnoreNavbar] = useState(false);

  useEffect(() => {
    const currentUrl = location.pathname.split("/")[1];

    setIgnoreNavbar(false);

    switch (currentUrl) {
      case "cart":
        setIgnoreNavbar(true);
        break;

      case "order":
        setIgnoreNavbar(true);
        break;

      case "admin":
        setIgnoreNavbar(true);
        break;

      case "login":
        setIgnoreNavbar(true);
        break;

      case "register":
        setIgnoreNavbar(true);
        break;

      default:
        break;
    }
  }, [location]);

  return (
    <MainContainer $ignoreNavbar={ignoreNavbar}>
      {!ignoreNavbar && <Navbar />}
      <Outlet />
    </MainContainer>
  );
};

export default GlobalLayout;

export const MainContainer = styled.div<{ $ignoreNavbar: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  /* padding-top: ${(props) =>
    props.$ignoreNavbar === true ? "0px" : "70px"}; */
`;
