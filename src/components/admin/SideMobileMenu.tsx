import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { colors } from "../../style/theme/colors";
import { Link } from "react-router-dom";
import { mobileLogo, orderImg, productImg } from "../../utility/imgConst";
import { zIndex } from "../../utility/zIndex";

type Props = {
  isHiddenMenu: boolean;
  handleModal: () => void;
};

const SideMobileMenu = ({ isHiddenMenu, handleModal }: Props) => {
  return (
    <>
      <MobileMenu $isHiddenMenu={isHiddenMenu}>
        <img src={mobileLogo} />
        <div onClick={handleModal}>
          <MenuIcon style={{ cursor: "pointer" }} />
        </div>
      </MobileMenu>

      <HiddenMenu $isHiddenMenu={isHiddenMenu}>
        <MenuContents>
          <Ul>
            <li>
              <Link to={"/admin/product?page=1"} onClick={handleModal}>
                <img src={productImg} />
                <span>Product</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/order?page=1"} onClick={handleModal}>
                <img src={orderImg} />
                <span>Order</span>
              </Link>
            </li>
          </Ul>
        </MenuContents>
      </HiddenMenu>

      <Container $isHiddenMenu={isHiddenMenu} onClick={handleModal}></Container>
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

export const Container = styled.div<{ $isHiddenMenu: boolean }>`
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: ${colors.modalOuter};
  visibility: ${(props) =>
    props.$isHiddenMenu === true ? "visivle" : "hidden"};
  position: fixed;
  z-index: ${zIndex.adminMobileBack};
  right: 0;
  bottom: 0;
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

//
export const MenuContents = styled.div`
  width: 100%;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
`;

export const Ul = styled.ul`
  & > li {
    padding-left: 10px;
    margin-bottom: 35px;
    font-size: 16px;
    font-weight: 600;
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
  }
`;
