import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { userInfo } from "../../redux/modules/userSlice";
import { useEffect } from "react";
import { getCartItem } from "../../api/getCartItem";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Text from "./Text";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userState } = useSelector((state: RootState) => state.user);
  const { cartLength } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (userState._id) {
      dispatch(getCartItem({}));
    }
  }, [userState._id]);

  const handleLogOut = () => {
    dispatch(userInfo({ name: null, email: null, _id: null, level: null }));
    sessionStorage.removeItem("token");
  };

  return (
    <Container>
      <InnerContainer>
        <Logo>
          <Link to={"/"}>
            <LogoImg src="https://user-images.githubusercontent.com/129598273/278886376-792e8c99-b971-432a-88fb-51b9ef5459ef.png" />
          </Link>
        </Logo>
        <AccountManagement>
          {userState._id ? (
            <>
              <Link to="/cart">
                <Flex>
                  <span>
                    <LocalMallOutlinedIcon fontSize={"small"} />
                  </span>
                  <Text size="13">장바구니({String(cartLength)})</Text>
                </Flex>
              </Link>
              <Link to="/order">
                <Flex>
                  <span>
                    <ContentPasteIcon fontSize={"small"} />
                  </span>
                  <Text size="14">order</Text>
                </Flex>
              </Link>
              <Link to="/" onClick={handleLogOut}>
                <Flex>
                  <span>
                    <ExitToAppOutlinedIcon fontSize={"small"} />
                  </span>
                  <Text size="14">Log Out</Text>
                </Flex>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Flex>
                <span>
                  <ExitToAppOutlinedIcon fontSize={"small"} />
                </span>
                <Text size="14">Log In</Text>
              </Flex>
            </Link>
          )}
        </AccountManagement>
      </InnerContainer>
    </Container>
  );
};

export default Navbar;

export const Container = styled.div`
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0;
  z-index: 999;
`;

export const InnerContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  & > a {
    display: flex;
    align-items: center;
  }
`;

export const LogoImg = styled.img`
  width: 180px;
`;

export const AccountManagement = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-right: 20px;
    font-size: 15px;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-right: 5px;
    display: flex;
    align-items: center;
    line-height: 24px;
  }
`;
