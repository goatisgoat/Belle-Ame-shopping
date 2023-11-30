import styled, { css, keyframes } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { colors } from "../../style/theme/colors";
import { Link, useNavigate } from "react-router-dom";
import { orderImg, productImg } from "../../utility/imgConst";
import { zIndex } from "../../utility/zIndex";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";

const SideMobileMenu = () => {
  const navigate = useNavigate();

  const [isHiddenMenu, setIsHiddenMenu] = useState(false);

  const handleModal = () => {
    if (!isHiddenMenu) document.body.style.overflow = "hidden";
    if (isHiddenMenu) document.body.style.overflow = "scroll";

    setIsHiddenMenu(!isHiddenMenu);
  };

  return (
    <>
      <MobileMenu $isHiddenMenu={isHiddenMenu}>
        <MobileLogoName onClick={() => navigate("/")}>BELLE AME</MobileLogoName>
        <MenuHamberger onClick={handleModal}>
          <MenuIcon style={{ cursor: "pointer" }} />
        </MenuHamberger>
      </MobileMenu>

      <HiddenMenu $isHiddenMenu={isHiddenMenu}>
        <MenuContents $isHiddenMenu={isHiddenMenu}>
          <div>
            <CloseBtn $isHiddenMenu={isHiddenMenu} onClick={handleModal}>
              <CloseIcon style={{ cursor: "pointer" }} />
            </CloseBtn>

            <Ul $isHiddenMenu={isHiddenMenu}>
              <Li $isHiddenMenu={isHiddenMenu}>
                <Link to={"/admin/product?page=1"} onClick={handleModal}>
                  <img src={productImg} />
                  <span>Product</span>
                </Link>
              </Li>
              <Li $isHiddenMenu={isHiddenMenu}>
                <Link to={"/admin/order?page=1"} onClick={handleModal}>
                  <img src={orderImg} />
                  <span>Order</span>
                </Link>
              </Li>
              {/* <Li $isHiddenMenu={isHiddenMenu}>
                <Link to={"/admin/coupon?page=1"}>
                  <img src={orderImg} />
                  <span>Coupon</span>
                </Link>
              </Li> */}
            </Ul>
          </div>

          <HomeBtn $isHiddenMenu={isHiddenMenu} onClick={() => navigate("/")}>
            <HomeIcon style={{ cursor: "pointer" }} />
            <span>Home</span>
          </HomeBtn>
        </MenuContents>
      </HiddenMenu>

      <HiddenOuter $isHiddenMenu={isHiddenMenu}></HiddenOuter>
    </>
  );
};

export default SideMobileMenu;

const move = keyframes`
    0%{
      opacity: 0;
      transform: scale(0.5);
    }
      100%{
        opacity: 1;
        transform: scale(1);
    }

`;

const upSlide = keyframes`
    0%{
      opacity: 0;
      top: -50px;
    }
    100%{
      opacity: 1;
      top: 0px;
    }

`;

const downSlide = keyframes`
    0%{
      opacity: 1;
      top: 0px;
    }
    100%{
      opacity: 0;
      top: -50px;
    }
`;

export const MobileMenu = styled.div<{ $isHiddenMenu: boolean }>`
  padding: 0 10px;
  display: none;

  @media only screen and (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const MobileLogoName = styled.div`
  display: inline-block;
  padding: 13px 18px;
  border-radius: 25px;
  font-family: "Patrick Hand", "Noto Sans KR";
  animation: ${move} 0.5s;
  cursor: pointer;
`;

export const MenuHamberger = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  animation: ${move} 0.5s;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const HiddenOuter = styled.div<{ $isHiddenMenu: boolean }>`
  width: 100%;
  height: 100vh;

  position: fixed;
  bottom: 0;
  left: 0;

  background-color: ${colors.modalOuter};
  z-index: ${zIndex.adminMonileMenuBack};

  visibility: ${(props) =>
    props.$isHiddenMenu === true ? "visivle" : "hidden"};
  transition: all 0.5s ease-in-out;
`;

export const HiddenMenu = styled.div<{ $isHiddenMenu: boolean }>`
  max-width: 100%;
  width: 300px;
  height: 100vh;
  position: absolute;
  right: 0;

  background-color: transparent;
  z-index: ${zIndex.adminMonileMenu};

  visibility: ${(props) =>
    props.$isHiddenMenu === true ? "visivle" : "hidden"};
  transition: all 0.5s ease-in-out;

  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    right: 20px;
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${colors.white};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
      props.$isHiddenMenu === true ? "scale(50)" : "scale(0)"};
  }
`;

//
export const MenuContents = styled.div<{ $isHiddenMenu: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 13px;
  z-index: ${zIndex.menuContents};
  padding: 15px;
`;

export const CloseBtn = styled.div<{ $isHiddenMenu: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 70px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  z-index: ${zIndex.menuContents};
  animation: ${(props) =>
    props.$isHiddenMenu === true
      ? css`
          ${upSlide} 0.5s forwards
        `
      : css`
          ${downSlide} 0.5s forwards
        `};
`;

export const Ul = styled.ul<{ $isHiddenMenu: boolean }>`
  padding-left: 12px;
  position: relative;
  z-index: ${zIndex.menuContents};

  animation: ${(props) =>
    props.$isHiddenMenu === true
      ? css`
          ${upSlide} 0.5s forwards
        `
      : css`
          ${downSlide} 0.5s forwards
        `};
`;

export const Li = styled.li<{ $isHiddenMenu: boolean }>`
  padding: 9px 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > a {
    display: flex;
    align-items: center;
  }

  & > a > img {
    width: 25px;
    margin-right: 10px;
  }
`;

export const HomeBtn = styled.div<{ $isHiddenMenu: boolean }>`
  padding: 15px 30px;
  margin-bottom: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${zIndex.menuContents};
  cursor: pointer;

  & > span {
    margin-left: 10px;
  }

  animation: ${(props) =>
    props.$isHiddenMenu === true
      ? css`
          ${upSlide} 0.5s forwards
        `
      : css`
          ${downSlide} 0.5s forwards
        `};
`;
