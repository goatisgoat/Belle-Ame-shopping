import { ThemeProvider } from "styled-components";
import "./App.css";
import Router from "./shared/Router";
import GlobalStyles from "./style/GlobalStyle";
import { theme } from "./style/theme/index";
import { useEffect } from "react";
import { userInfo } from "./redux/modules/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./api/authUser";
import { AppDispatch, RootState } from "./redux/config/ConfigStore";
import Toastify from "./components/common/Toastify";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userState } = useSelector((state: RootState) => state.user);

  const getUser = async () => {
    try {
      if (userState._id) {
        return null;
      }

      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        return dispatch(authUser());
      }

      throw new Error();
    } catch (error) {
      dispatch(userInfo({ name: null, email: null, _id: null, level: null }));
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
