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
};

const Input = ({ id, type, value, placeholder, onChange, isError }: Props) => {
  return (
    <InputDiv $isError={isError || false}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </InputDiv>
  );
};

export default Input;

export const InputDiv = styled.div<{ $isError: boolean }>`
  width: 100%;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  background-color: #ffffffdb;
  border-radius: 3px;
  border-color: ${(props) =>
    props.$isError === true ? "#f86c6c" : `${colors.inputBorder}`};

  &:focus-within {
    border: 2px solid ${colors.inputFocus};
  }

  & > input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    color: ${colors.black_200};
    outline: none;
    border: none;
    background-color: transparent;
  }
`;
