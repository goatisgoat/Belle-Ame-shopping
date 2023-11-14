import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  mobileLogo,
  orderImg,
  pcLogo,
  productImg,
} from "../../utility/imgConst";

const SideMenu = () => {
  return (
    <SideMenuDiv>
      <Link to={"/"}>
        <PcLogo src={pcLogo} alt="pcLogo" />
      </Link>
      <Link to={"/"}>
        <MobileLogo src={mobileLogo} alt="mobileLogo" />
      </Link>

      <Ul>
        <li>
          <Link to={"/admin/product?page=1"}>
            <img src={productImg} />
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin/order?page=1"}>
            <img src={orderImg} />
            <span>Order</span>
          </Link>
        </li>
      </Ul>
    </SideMenuDiv>
  );
};

export default SideMenu;

export const PcLogo = styled.img`
  width: 200px;
  margin-bottom: 40px;
  display: block;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

export const MobileLogo = styled.img`
  display: none;

  @media all and (min-width: 700px) and (max-width: 1000px) {
    width: 70px;
    margin-bottom: 40px;
    display: block;
  }
`;

export const SideMenuDiv = styled.div`
  ////
  @media only screen and (max-width: 700px) {
    & {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
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

  @media only screen and (max-width: 1000px) {
    & > li {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > li > a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 13px;
      cursor: pointer;
    }
    & > li > a > img {
      margin: 0;
    }
  }
`;
