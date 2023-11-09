import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const SignContainer = styled.div`
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
    border: none;
    outline: none;
    font-size: 15px;
    font-weight: 600;
    background-color: inherit;
  }
`;

export const CheckWrap = styled.div`
  width: 80%;
  max-width: 400px;
  margin-bottom: 20px;
  margin: 0 auto;

  & > input {
    cursor: pointer;
  }

  & > label {
    cursor: pointer;
  }
`;

export const SignBtn = styled.button`
  width: 80%;
  max-width: 400px;
  height: 45px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 400;
  background-color: ${colors.antiquewhite};
`;

export const SSS = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
`;

export const PolicyColor = styled.span<{ $policyError: boolean }>`
  color: ${(props) => (props.$policyError === true ? "red" : "black")};
`;
