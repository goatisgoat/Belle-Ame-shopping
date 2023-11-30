import styled, { css, keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Text from "./Text";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { colors } from "../../style/theme/colors";

type Props = {
  isModalOpen: boolean;
  handleModal: () => void;
  cartLength: number;
  handleLogOut: () => void;
};

const NavbarMobile = ({
  isModalOpen,
  handleModal,
  cartLength,
  handleLogOut,
}: Props) => {
  const { userState } = useSelector((state: RootState) => state.user);

  return (
    <Container $isModalOpen={isModalOpen}>
      <Inner $isModalOpen={isModalOpen}>
        <CloseBtn $isModalOpen={isModalOpen} onClick={handleModal}>
          <CloseIcon style={{ cursor: "pointer" }} />
        </CloseBtn>

        {userState._id ? (
          <>
            <SideMenuContainer>
              <div>
                <Link to="/cart">
                  <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                    <span>
                      <LocalMallOutlinedIcon fontSize={"small"} />
                    </span>
                    <Text size={13}>Cart({String(cartLength)})</Text>
                  </Flex>
                </Link>
                <Link to="/order/list">
                  <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                    <span>
                      <ContentPasteIcon fontSize={"small"} />
                    </span>
                    <Text size={13}>Order</Text>
                  </Flex>
                </Link>
                {userState.level === "admin" && (
                  <Link to="/admin/product?page=1">
                    <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                      <span>
                        <AdminPanelSettingsIcon
                          fontSize={"small"}
                          color={"primary"}
                        />
                      </span>
                      <Text size={13} color="#1c4fff">
                        Admin
                      </Text>
                    </Flex>
                  </Link>
                )}
              </div>
              <div>
                <Link to="/" onClick={handleLogOut}>
                  <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                    <span>
                      <ExitToAppOutlinedIcon fontSize={"small"} />
                    </span>
                    <Text size={13}>Log Out</Text>
                  </Flex>
                </Link>
              </div>
            </SideMenuContainer>
          </>
        ) : (
          <Link to="/login">
            <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
              <span>
                <ExitToAppOutlinedIcon fontSize={"small"} />
              </span>
              <Text size={13}>Log In</Text>
            </Flex>
          </Link>
        )}
      </Inner>
    </Container>
  );
};

export default NavbarMobile;

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

export const Container = styled.div<{ $isModalOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.modalOuter};
  transition: all 0.5s ease-in-out;
  visibility: ${(props) =>
    props.$isModalOpen === true ? "visivle" : "hidden"};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

export const Inner = styled.div<{ $isModalOpen: boolean }>`
  width: 100%;
  max-width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: transparent;

  visibility: ${(props) =>
    props.$isModalOpen === true ? "visivle" : "hidden"};

  transition: all 0.5s ease-in-out;
  z-index: 1;

  &::before {
    content: "";
    width: 45px;
    height: 45px;
    position: absolute;
    top: 13px;
    right: 30px;
    bottom: 0;
    border-radius: 50%;
    background-color: ${colors.white};

    transform: ${(props) =>
      props.$isModalOpen === true ? "scale(50)" : "scale(0)"};

    transition: all 0.5s ease-in-out;
    z-index: -1;
  }
`;

export const CloseBtn = styled.div<{ $isModalOpen: boolean }>`
  width: 45px;
  height: 45px;
  margin: 15px;
  margin-bottom: 70px;
  border-radius: 50%;

  display: flex;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  animation: ${(props) =>
    props.$isModalOpen === true
      ? css`
          ${upSlide} 0.5s forwards
        `
      : css`
          ${downSlide} 0.5s forwards
        `};
`;

export const SideMenuContainer = styled.div`
  width: 100%;
  height: calc(100% - 70px - 45px - 15px);

  display: flex;

  flex-direction: column;
  justify-content: space-between;
`;

export const Flex = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  white-space: nowrap;
  z-index: 99;
  position: relative;

  margin: 0 20px;
  padding: 9px 18px;
  margin-bottom: 20px;
  padding-left: 30px;
  border-radius: 25px;
  /* font-family: "Patrick Hand", "Noto Sans KR"; */

  animation: ${(props) =>
    props.$isModalOpen === true
      ? css`
          ${upSlide} 0.5s forwards
        `
      : css`
          ${downSlide} 0.5s forwards
        `};

  & > span {
    margin-right: 5px;
    display: flex;
    line-height: 24px;
  }
`;
