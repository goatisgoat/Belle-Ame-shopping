import React from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  isHiddenMenu: boolean;
  setIsHiddenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const mobileLogo =
  "https://user-images.githubusercontent.com/129598273/278886455-f986a687-5402-4df2-80ff-bf1ea90beeaf.png";

const SideMobileMenu = ({ isHiddenMenu, setIsHiddenMenu }: Props) => {
  return (
    <>
      <MobileMenu $isHiddenMenu={isHiddenMenu}>
        <img src={mobileLogo} />
        <div onClick={() => setIsHiddenMenu(!isHiddenMenu)}>
          <MenuIcon style={{ cursor: "pointer" }} />
        </div>
      </MobileMenu>
      <HiddenMenu $isHiddenMenu={isHiddenMenu}>
        <SideMenu />

        <CloseBtn>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsHiddenMenu(false)}
          />
        </CloseBtn>
      </HiddenMenu>
    </>
  );
};

export default SideMobileMenu;

export const MobileMenu = styled.div<{ $isHiddenMenu: boolean }>`
  padding: 0 10px;
  display: none;
  position: relative;

  & > img {
    width: 50px;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HiddenMenu = styled.div<{ $isHiddenMenu: boolean }>`
  width: 100%;
  height: ${(props) => (props.$isHiddenMenu === true ? "230px" : "0px")};
  position: absolute;
  top: 59px;
  visibility: ${(props) =>
    props.$isHiddenMenu === true ? "visivle" : "hidden"};
  transition: all 0.5s ease-in-out;
  border-bottom: 1px solid #e3e3e3;
  background-color: #ffffff;

  & > div {
    position: absolute;
    bottom: 0;
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
`;
