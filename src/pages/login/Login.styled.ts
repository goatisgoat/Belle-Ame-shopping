import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const H1 = styled.h1`
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 26px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputWrap = styled.div`
  width: 80%;
  max-width: 400px;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;

  &:focus-within {
    border: 2px solid ${colors.inputFocus};
  }

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    outline: none;
    border: none;
    font-size: 15px;
    font-weight: 600;
    background-color: inherit;
  }
`;

export const HaveAccount = styled.div`
  width: 80%;
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 13px;
  display: flex;
  justify-content: center;
`;

export const SignColor = styled(Link)`
  margin-left: 10px;
  text-decoration: underline;
  cursor: pointer;

  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: ${colors.haveAccount};
  }
`;

export const LoginBtn = styled.button`
  width: 80%;
  max-width: 400px;
  height: 45px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 400;
  border-radius: 5px;
  background-color: ${colors.antiquewhite};
`;

export const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const GoogleIcon = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid ${colors.gray_200};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;

  & > img {
    width: 25px;
    height: 25px;
  }
`;

export const KakaoIcon = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid ${colors.gray_200};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > img {
    width: 45px;
    height: 45px;
    object-fit: cover;
  }
`;
