import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginWithEmail } from "../../api/loginWithEmail";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/config/ConfigStore";
import { useNavigate, Navigate } from "react-router-dom";
import * as S from "./Login.styled";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../api/loginWIthGoogle";
import { GoogleLogo } from "../../utility/imgConst";

const Login = () => {
  const storedToken = sessionStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      loginWithEmail({
        email,
        password,
        navigate,
      })
    );
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      dispatch(loginWithGoogle({ code, navigate }));
    },
    flow: "auth-code",
  });

  if (storedToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <S.LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <S.H1>로그인</S.H1>
      <S.Form onSubmit={handleLogin}>
        <S.InputWrap>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoFocus
            required
          />
        </S.InputWrap>
        <S.InputWrap>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </S.InputWrap>
        <S.LoginBtn>로그인</S.LoginBtn>
      </S.Form>
      <S.HaveAccount>
        Don't you have an account?
        <S.SignColor to="/register">Sign up</S.SignColor>
      </S.HaveAccount>
      <S.GoogleIcon onClick={() => handleGoogleLogin()}>
        <img src={GoogleLogo} alt="Google-Logo" />
      </S.GoogleIcon>
    </S.LoginContainer>
  );
};
export default Login;
