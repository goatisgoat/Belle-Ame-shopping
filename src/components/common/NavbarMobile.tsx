import styled from "styled-components";
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
            <Link to="/" onClick={handleLogOut}>
              <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                <span>
                  <ExitToAppOutlinedIcon fontSize={"small"} />
                </span>
                <Text size="14">Log Out</Text>
              </Flex>
            </Link>
            <Link to="/cart">
              <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                <span>
                  <LocalMallOutlinedIcon fontSize={"small"} />
                </span>
                <Text size="13">장바구니({String(cartLength)})</Text>
              </Flex>
            </Link>
            <Link to="/order/list">
              <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
                <span>
                  <ContentPasteIcon fontSize={"small"} />
                </span>
                <Text size="14">order</Text>
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
                  <Text size="14" color="#1c4fff">
                    Admin
                  </Text>
                </Flex>
              </Link>
            )}
          </>
        ) : (
          <Link to="/login">
            <Flex $isModalOpen={isModalOpen} onClick={handleModal}>
              <span>
                <ExitToAppOutlinedIcon fontSize={"small"} />
              </span>
              <Text size="14">Log In</Text>
            </Flex>
          </Link>
        )}
      </Inner>
    </Container>
  );
};

export default NavbarMobile;

export const Container = styled.div<{ $isModalOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.modalOuter};
  visibility: ${(props) =>
    props.$isModalOpen === true ? "visivle" : "hidden"};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Inner = styled.div<{ $isModalOpen: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.$isModalOpen === true ? "300px" : "0px")};
  height: 100vh;
  background-color: ${colors.white};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all 0.8s ease-in-out;
`;

export const CloseBtn = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  margin: 10px;
  margin-bottom: 50px;
`;

export const Flex = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  margin-bottom: 20px;
  padding-left: 40px;
  white-space: nowrap;

  & > span {
    margin-right: 5px;
    display: flex;
    line-height: 24px;
  }
`;
