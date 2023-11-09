import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import Modal from "../modal/Modal";

type props = {
  list: string[];
  handleSelect: (e: React.MouseEvent<HTMLElement>, i: string) => void;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectOpen: boolean;
  defaultOption: string | null;
  error: boolean;
  stock: { [key: string]: string } | undefined;
};

const CartSelect = ({
  list,
  handleSelect,
  setSelectOpen,
  defaultOption,
  isSelectOpen,
  error,
  stock,
}: props) => {
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const dropBox = dropBoxRef.current?.getBoundingClientRect();

  const top = dropBox?.top;
  const left = dropBox?.left;
  const width = dropBox?.width;

  return (
    <SelectTitle ref={dropBoxRef} $error={error}>
      <div onClick={() => setSelectOpen((pre) => !pre)}>
        {defaultOption || "--"}
      </div>
      <Modal
        isOpen={isSelectOpen}
        top={top}
        left={left}
        width={width}
        setSelectOpen={setSelectOpen}
      >
        <SelectUl $isSlelctopen={isSelectOpen}>
          {list.map((i) => (
            <SelectLi
              id={i}
              onClick={(e) => handleSelect(e, i)}
              key={i}
              $isSelected={i === defaultOption}
              $lineThrough={stock ? Number(stock[i]) <= 0 : false}
            >
              {i}
            </SelectLi>
          ))}
        </SelectUl>
      </Modal>
    </SelectTitle>
  );
};

export default CartSelect;

export const SelectTitle = styled.div<{ $error: boolean }>`
  width: 100%;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  border-color: ${(props) =>
    props.$error === true ? "red" : `${colors.inputBorder}`};
  border-radius: 3px;
  line-height: 35px;
  padding: 0 10px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$error === true ? "rgba(255, 97, 97, 0.24) 0px 2px 8px 0px" : "none"};

  & > div {
    color: ${colors.black_200};
  }
`;

export const SelectUl = styled.ul<{ $isSlelctopen: boolean }>`
  max-height: 100px;
  display: ${(props) => (props.$isSlelctopen === true ? "block" : "none")};
  margin-top: 10px;
  border: 1px solid;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  padding: 5px;
  background-color: ${colors.white};
  color: ${colors.black_200};
  overflow: scroll;
`;

export const SelectLi = styled.ul<{
  $isSelected: boolean;
  $lineThrough: boolean;
}>`
  text-decoration: none;
  padding: 5px 0;
  padding-left: 5px;
  border-radius: 3px;

  text-decoration: ${(props) =>
    props.$lineThrough === true ? "line-through" : "none"};

  cursor: ${(props) =>
    props.$isSelected === true || props.$lineThrough === true
      ? "not-allowed"
      : "pointer"};

  background-color: ${(props) =>
    props.$isSelected === true ? `${colors.modalOuter}` : "none"};

  color: ${(props) =>
    props.$isSelected === true ? `${colors.white}` : `${colors.black_200}`};

  &:hover {
    background-color: ${(props) =>
      props.$isSelected === true ? `${colors.modalOuter}` : "antiquewhite"};

    border-radius: 3px;
  }
`;
