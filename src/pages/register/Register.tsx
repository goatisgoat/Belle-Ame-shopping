import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../api/register";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createToastify } from "../../redux/modules/toastifySlice";
import * as S from "./Register.styled";

const Register = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  const [isChecked, setIsChecked] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [policyError, setPolicyError] = useState(false);

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleResister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      dispatch(
        createToastify({ status: "error", message: "이용약관에 동의해주세요." })
      );
      return setPolicyError(true);
    }

    if (!emailRegEx.test(email ? email : "")) {
      return dispatch(
        createToastify({
          status: "error",
          message: "이메일 형식이 올바르지 않습니다.",
        })
      );
    }

    dispatch(
      register({
        email,
        name,
        password,
        setIsChecked,
        navigate,
      })
    );
  };

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <S.SignContainer>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <S.H1>회원가입</S.H1>

      <S.Form onSubmit={handleResister}>
        <S.InputWrap>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <span>Name</span>
        </S.InputWrap>

        <S.InputWrap>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
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

        <S.CheckWrap>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                  setPolicyError(false);
                }}
              />
            }
            label={
              <S.PolicyColor $policyError={policyError}>
                이용약관에 동의합니다
              </S.PolicyColor>
            }
          />
        </S.CheckWrap>
        <S.SignBtn type="submit">가입하기</S.SignBtn>
      </S.Form>
    </S.SignContainer>
  );
};
export default Register;
