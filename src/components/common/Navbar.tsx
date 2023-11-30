import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Text from "./Text";
import { getCartLength } from "../../api/getCartLength";
import NavbarMobile from "./NavbarMobile";
import MenuIcon from "@mui/icons-material/Menu";
import { colors } from "../../style/theme/colors";
import { zIndex } from "../../utility/zIndex";
import { logout } from "../../api/logout";
import { createToastify } from "../../redux/modules/toastifySlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userState } = useSelector((state: RootState) => state.user);
  const { cartLength } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (userState._id) {
      dispatch(getCartLength({ navigate }));
    }
  }, [userState._id]);

  const handleLogOut = () => {
    dispatch(logout({ navigate }));
    dispatch(
      createToastify({
        status: "success",
        message: "로그아웃이 완료되었습니다.",
      })
    );
  };

  const handleModal = () => {
    if (!isModalOpen) document.body.style.overflow = "hidden";
    if (isModalOpen) document.body.style.overflow = "scroll";

    setIsModalOpen(!isModalOpen);
  };

  const [isUp, setIsUp] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const {
      scrollY,
      document: {
        documentElement: { scrollHeight, clientHeight },
      },
    } = window;

    const deltaY = scrollY - pageY;
    const isUp = scrollY !== 0 && deltaY >= 0;
    const isBottom = scrollHeight - scrollY - clientHeight === 0;

    setIsUp(isUp);
    setPageY(scrollY);
    setIsBottom(isBottom);
    if (isUp) {
    }
  }, [pageY, setIsUp, setPageY, setIsBottom]);

  const throttleHelper = (callback: () => void, waitTime: number) => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return () => {
      if (timerId) return;

      timerId = setTimeout(() => {
        callback();
        timerId = null;
      }, waitTime);
    };
  };

  const throttleScroll = throttleHelper(handleScroll, 300);

  // 스크롤 이벤트
  useLayoutEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  return (
    <Container $isup={isUp} $pageY={pageY}>
      <InnerContainer>
        <LogoContainer>
          <LogoName onClick={() => navigate("/")}>BELLE AME</LogoName>
          {/* <Menu>
            <Text onClick={() => navigate("/search")} size={14}>
              Product
            </Text>
          </Menu> */}
        </LogoContainer>
        <AccountManagement>
          {userState._id ? (
            <>
              <Link to="/" onClick={handleLogOut}>
                <Circle>
                  <ExitToAppOutlinedIcon fontSize={"small"} />
                </Circle>
              </Link>
              <PositionLink to="/cart">
                <Circle>
                  <LocalMallOutlinedIcon fontSize={"small"} />
                </Circle>
                {cartLength && (
                  <NumCount>
                    <Text size={11}>{String(cartLength)}</Text>
                  </NumCount>
                )}
              </PositionLink>
              <Link to="/order/list">
                <Circle>
                  <ContentPasteIcon fontSize={"small"} />
                </Circle>
              </Link>
              {userState.level === "admin" && (
                <Link to="/admin/product?page=1">
                  <Circle>
                    <AdminPanelSettingsIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                  </Circle>
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <Circle>
                <ExitToAppOutlinedIcon fontSize={"small"} />
              </Circle>
            </Link>
          )}
        </AccountManagement>

        {/* 모바일 */}
        <OpenModalBtn $isModalOpen={isModalOpen} onClick={handleModal}>
          <div>
            <MenuIcon />
          </div>
        </OpenModalBtn>
      </InnerContainer>

      {/* 모바일 */}
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

export const Container = styled.div<{ $isup: boolean; $pageY: number }>`
  height: 70px;
  padding: 0;
  position: fixed;
  top: ${(props) => (props.$isup ? "-70px" : 0)};
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: ${zIndex.navContainer};
  transition: all 0.1s ease-in-out;
  background-color: ${(props) =>
    props.$pageY < 50 ? "transparent" : colors.white};
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

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoName = styled.div`
  margin: 0 20px;
  padding: 9px 18px;
  background-color: ${colors.antiquewhite};
  border: 1px solid ${colors.antiquewhite};
  border-radius: 25px;
  font-family: "Patrick Hand", "Noto Sans KR";
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  animation: ${move} 0.5s;
  cursor: pointer;
`;

export const Menu = styled.div`
  padding: 9px 18px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.white};
  border-radius: 25px;
  background-color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  & > p {
    margin: 0 10px;
    cursor: pointer;
  }
`;

export const AccountManagement = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-right: 15px;
    animation: ${move} 0.5s;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const PositionLink = styled(Link)`
  position: relative;
`;

export const Circle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const NumCount = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.purple_200};
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const OpenModalBtn = styled.div<{ $isModalOpen: boolean }>`
  animation: ${move} 0.5s;
  display: none;
  cursor: pointer;

  & > div {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  @media only screen and (max-width: 700px) {
    margin-right: 30px;
    display: block;
  }
`;
