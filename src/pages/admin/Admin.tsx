import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SideMenu from "../../components/admin/SideMenu";
import SideMobileMenu from "../../components/admin/SideMobileMenu";
import * as S from "./Admin.styled";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const [isHiddenMenu, setIsHiddenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Sidebar>
        {/* pc */}
        <SideMenu />
        <S.HomeBtn>
          <HomeIcon style={{ cursor: "pointer" }} />
        </S.HomeBtn>
        {/* 모바일 */}
        <SideMobileMenu
          isHiddenMenu={isHiddenMenu}
          setIsHiddenMenu={setIsHiddenMenu}
        />
      </S.Sidebar>
      <Outlet />
    </S.Container>
  );
};

export default Admin;
