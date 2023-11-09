import { Link } from "react-router-dom";
import styled from "styled-components";

/////
const pcLogo =
  "https://user-images.githubusercontent.com/129598273/278886376-792e8c99-b971-432a-88fb-51b9ef5459ef.png";
const mobileLoho =
  "https://user-images.githubusercontent.com/129598273/278886455-f986a687-5402-4df2-80ff-bf1ea90beeaf.png";

const adminImg =
  "https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png";
const productImg = "https://cdn-icons-png.flaticon.com/128/5349/5349769.png";

const orderImg =
  "https://icons.veryicon.com/png/o/system/linear-chh/order-27.png";
////

const SideMenu = () => {
  return (
    <SideMenuDiv>
      <Link to={"/"}>
        <PcLogo src={pcLogo} alt="pcLogo" />
      </Link>
      <Link to={"/"}>
        <MobileLogo src={mobileLoho} alt="mobileLogo" />
      </Link>

      <Ul>
        <li>
          <Link to={"/"}>
            <img src={adminImg} />
            <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <img src={productImg} />
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
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
  margin-bottom: 20px;
  display: block;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

export const MobileLogo = styled.img`
  display: none;

  @media all and (min-width: 700px) and (max-width: 1000px) {
    width: 70px;
    margin-bottom: 20px;
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
    align-content: center;
    cursor: pointer;
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

  /* @media only screen and (max-width: 700px) {
    margin-top: 30px;

    & > li {
      display: flex;
      flex-direction: row;
      margin-bottom: 40px;
    }
  } */
`;
