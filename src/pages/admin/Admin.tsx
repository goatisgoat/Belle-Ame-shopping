import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SideMenu from "../../components/admin/SideMenu";
import SideMobileMenu from "../../components/admin/SideMobileMenu";
import * as S from "./Admin.styled";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";

const Admin = () => {
  const { userState } = useSelector((state: RootState) => state.user);

  const [isHiddenMenu, setIsHiddenMenu] = useState(false);

  const handleModal = () => {
    if (!isHiddenMenu) document.body.style.overflow = "hidden";
    if (isHiddenMenu) document.body.style.overflow = "scroll";

    setIsHiddenMenu(!isHiddenMenu);
  };

  if (userState.level !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return (
    <S.Container>
      <S.Sidebar>
        {/* pc */}
        <SideMenu />
        <S.HomeBtn>
          <HomeIcon style={{ cursor: "pointer" }} />
        </S.HomeBtn>

        {/* 모바일 */}
        <SideMobileMenu isHiddenMenu={isHiddenMenu} handleModal={handleModal} />
      </S.Sidebar>
      <Outlet />
    </S.Container>
  );
};

export default Admin;
