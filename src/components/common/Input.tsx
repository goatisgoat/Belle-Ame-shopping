import { ChangeEventHandler } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";

type Props = {
  id: string;
  type: string;
  value?: string | number;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isError?: boolean;
  spanColor: string;
};

const Input = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  isError,
  spanColor,
}: Props) => {
  return (
    <InputDiv $isError={isError || false} $spanColor={spanColor}>
      <input id={id} type={type} value={value} onChange={onChange} required />
      <span>{placeholder}</span>
    </InputDiv>
  );
};

export default Input;

export const InputDiv = styled.div<{ $isError: boolean; $spanColor: string }>`
  width: 100%;
  height: 45px;
  background-color: #ffffffdb;
  border-radius: 3px;
  position: relative;
  z-index: 1;

  //input
  & > input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    color: ${colors.black_200};
    outline: none;

    border: 1px solid;
    background-color: transparent;
    border-color: ${(props) =>
      props.$isError === true ? "#f86c6c" : `${colors.inputBorder}`};
    border-radius: 5px;

    transition: 0.3s;
  }

  & > input:focus {
    border: 2px solid ${colors.inputFocus};
  }

  //span
  & > span {
    padding: 0 5px;
    position: absolute;
    left: 3px;
    top: 13px;
    font-size: 13px;
    color: ${colors.basicWithBrown};
    transition: 0.3s;
    z-index: -1;
  }

  & > input:valid ~ span,
  & > input:focus ~ span {
    background-color: ${(props) => `${props.$spanColor}`};
    transform: translateX(10px) translateY(-21px);
    font-size: 13px;
    z-index: 0;
  }
`;
