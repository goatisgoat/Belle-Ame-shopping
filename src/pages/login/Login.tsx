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
import { GoogleLogo, KakaoLogo } from "../../utility/imgConst";
import { resetTokenErrorHandled } from "../../utility/apiHelper";

const Login = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetTokenErrorHandled();
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
      resetTokenErrorHandled();
      dispatch(loginWithGoogle({ code, navigate }));
    },
    flow: "auth-code",
  });

  const handleKakaoLogin = async () => {
    resetTokenErrorHandled();
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = kakaoURL;
  };

  if (accessToken) {
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
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <span>Email</span>
        </S.InputWrap>
        <S.InputWrap>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </S.InputWrap>
        <S.LoginBtn>로그인</S.LoginBtn>
      </S.Form>
      <S.HaveAccount>
        Don't you have an account?
        <S.SignColor to="/register">Sign up</S.SignColor>
      </S.HaveAccount>
      <S.SocialLogin>
        <S.GoogleIcon onClick={() => handleGoogleLogin()}>
          <img src={GoogleLogo} alt="Google-Logo" />
        </S.GoogleIcon>
        <S.KakaoIcon onClick={handleKakaoLogin}>
          <img src={KakaoLogo} />
        </S.KakaoIcon>
      </S.SocialLogin>
    </S.LoginContainer>
  );
};
export default Login;
