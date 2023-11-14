import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { userInfo } from "../../redux/modules/userSlice";
import { useEffect, useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Text from "./Text";
import { getCartLength } from "../../api/getCartLength";
import NavbarMobile from "./NavbarMobile";
import MenuIcon from "@mui/icons-material/Menu";
import { colors } from "../../style/theme/colors";
import { pcLogo } from "../../utility/imgConst";
import { zIndex } from "../../utility/zIndex";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userState } = useSelector((state: RootState) => state.user);
  const { cartLength } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (userState._id) {
      dispatch(getCartLength({}));
    }
  }, [userState._id]);

  const handleLogOut = () => {
    dispatch(userInfo({ name: null, email: null, _id: null, level: null }));
    sessionStorage.removeItem("token");
  };

  const handleModal = () => {
    if (!isModalOpen) document.body.style.overflow = "hidden";
    if (isModalOpen) document.body.style.overflow = "scroll";

    setIsModalOpen(!isModalOpen);
  };
  return (
    <Container>
      <InnerContainer>
        <Logo>
          <Link to={"/"}>
            <LogoImg src={pcLogo} />
          </Link>
        </Logo>
        <AccountManagement>
          {userState._id ? (
            <>
              <Link to="/" onClick={handleLogOut}>
                <Flex>
                  <span>
                    <ExitToAppOutlinedIcon fontSize={"small"} />
                  </span>
                  <Text size="14">Log Out</Text>
                </Flex>
              </Link>
              <Link to="/cart">
                <Flex>
                  <span>
                    <LocalMallOutlinedIcon fontSize={"small"} />
                  </span>
                  <Text size="13">장바구니({String(cartLength)})</Text>
                </Flex>
              </Link>
              <Link to="/order/list">
                <Flex>
                  <span>
                    <ContentPasteIcon fontSize={"small"} />
                  </span>
                  <Text size="14">order</Text>
                </Flex>
              </Link>
              {userState.level === "admin" && (
                <Link to="/admin/product?page=1">
                  <Flex>
                    <span>
                      <AdminPanelSettingsIcon
                        fontSize={"small"}
                        color={"primary"}
                      />
                    </span>
                    <Text size="14" color="#1c4fff">
                      Admin
                    </Text>
                  </Flex>
                </Link>
              )}
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

        <OpenModalBtn onClick={handleModal}>
          <MenuIcon />
        </OpenModalBtn>
      </InnerContainer>

      <NavbarMobile
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        cartLength={cartLength}
        handleLogOut={handleLogOut}
      />
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
  background-color: ${colors.white};
  padding: 0;
  z-index: ${zIndex.navContainer};
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

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const Flex = styled.div`
  display: flex;

  & > span {
    margin-right: 5px;
    display: flex;
    line-height: 24px;
  }
`;

export const OpenModalBtn = styled.button`
  display: none;
  @media only screen and (max-width: 700px) {
    margin-right: 30px;
    display: block;
  }
`;
