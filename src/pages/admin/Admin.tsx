import HomeIcon from "@mui/icons-material/Home";
import SideMenu from "../../components/admin/SideMenu";
import SideMobileMenu from "../../components/admin/SideMobileMenu";
import * as S from "./Admin.styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrlPath = location.pathname.split("/")[2];

  return (
    <S.Container>
      <S.Sidebar>
        {/* pc */}
        <SideMenu currentUrlPath={currentUrlPath} />
        <S.HomeBtn onClick={() => navigate("/")}>
          <HomeIcon style={{ cursor: "pointer" }} />
          <span>Home</span>
        </S.HomeBtn>
      </S.Sidebar>

      {/* 모바일 */}
      <SideMobileMenu />
      <Outlet />
    </S.Container>
  );
};

export default Admin;
