import { ThemeProvider } from "styled-components";
import "./App.css";
import Router from "./shared/Router";
import GlobalStyles from "./style/GlobalStyle";
import { theme } from "./style/theme/index";
import { useEffect } from "react";
import { deleteInfo } from "./redux/modules/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./api/authUser";
import { AppDispatch, RootState } from "./redux/config/ConfigStore";
import Toastify from "./components/common/Toastify";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userState } = useSelector((state: RootState) => state.user);

  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const getUser = async () => {
    try {
      if (userState._id) return "";

      //토큰 있을 때
      if (accessToken && refreshToken) {
        return dispatch(authUser({ navigate }));
      }

      //토큰 없을 때
      throw new Error();
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      dispatch(deleteInfo({}));
    }
  };

  useEffect(() => {
    getUser();
  }, [userState._id]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toastify />
        <Router />
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;
