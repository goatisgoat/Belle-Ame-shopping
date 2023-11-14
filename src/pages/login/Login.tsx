import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginWithEmail } from "../../api/loginWithEmail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./Login.styled";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../api/loginWIthGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userState } = useSelector((state: RootState) => state.user);

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

  useEffect(() => {
    if (userState._id) {
      navigate("/");
    }
  }, [userState]);

  const handleGoogleLogin = async (googleData: any) => {
    dispatch(loginWithGoogle({ credential: googleData.credential, navigate }));
  };

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
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </S.LoginContainer>
  );
};
export default Login;
