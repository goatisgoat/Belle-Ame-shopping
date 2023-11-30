import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { couponImg, orderImg, productImg } from "../../utility/imgConst";
import { colors } from "../../style/theme/colors";

type Props = {
  currentUrlPath: string;
};
const SideMenu = ({ currentUrlPath }: Props) => {
  const navigate = useNavigate();
  return (
    <SideMenuDiv>
      <Link to={"/"}>
        <LogoName onClick={() => navigate("/")}>BELLE AME</LogoName>
      </Link>

      <Ul>
        <Li $currentUrlPath={currentUrlPath === "product"}>
          <Link to={"/admin/product?page=1"}>
            <img src={productImg} />
            <span>Product</span>
          </Link>
        </Li>
        <Li $currentUrlPath={currentUrlPath === "order"}>
          <Link to={"/admin/order?page=1"}>
            <img src={orderImg} />
            <span>Order</span>
          </Link>
        </Li>
        {/* <Li $currentUrlPath={currentUrlPath === "coupon"}>
          <Link to={"/admin/coupon?page=1"}>
            <img src={couponImg} />
            <span>Coupon</span>
          </Link>
        </Li> */}
      </Ul>
    </SideMenuDiv>
  );
};

export default SideMenu;

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

export const LogoName = styled.div`
  margin: 20px;
  margin-bottom: 50px;
  padding: 9px;
  border-radius: 25px;
  text-align: center;
  font-size: 20px;
  font-family: "Patrick Hand", "Noto Sans KR";
  animation: ${move} 0.5s;
  cursor: pointer;

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

export const SideMenuDiv = styled.div`
  @media only screen and (max-width: 700px) {
    & {
      display: none;
    }
  }
`;

export const Ul = styled.ul`
  //////
  @media only screen and (max-width: 1000px) {
    padding-top: 40px;
  }
`;

export const Li = styled.li<{ $currentUrlPath: boolean }>`
  padding: 15px 0;
  padding-left: 30px;
  margin-bottom: 20px;
  font-size: 13px;
  border-left: ${(props) =>
    props.$currentUrlPath ? `3px solid ${colors.adminLocation}` : "none"};

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

  //////
  @media only screen and (max-width: 1000px) {
    padding: 0;
    height: 60px;
    margin-bottom: 20px;
    justify-content: center;

    & > a > img {
      margin: 0;
    }

    & > a > span {
      display: none;
    }
  }
`;
