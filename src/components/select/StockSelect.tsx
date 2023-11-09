import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import Modal from "../modal/Modal";
import { Stoke } from "../../models/product.type";

type props = {
  list: string[];
  handleSelect: (e: React.MouseEvent<HTMLElement>) => void;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectOpen: boolean;
  defaultOption: string | null;
  stokes: Stoke[];
};

const StockSelect = ({
  list,
  handleSelect,
  setSelectOpen,
  defaultOption,
  isSelectOpen,
  stokes,
}: props) => {
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const dropBox = dropBoxRef.current?.getBoundingClientRect();

  const top = dropBox?.top;
  const left = dropBox?.left;
  const width = dropBox?.width;
  return (
    <SelectTitle ref={dropBoxRef}>
      <div onClick={() => setSelectOpen((pre) => !pre)}>{defaultOption}</div>
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
              onClick={handleSelect}
              key={i}
              $isSelected={stokes.some((s) => s.size === i)}
            >
              {i}
            </SelectLi>
          ))}
        </SelectUl>
      </Modal>
    </SelectTitle>
  );
};

export default StockSelect;

export const SelectTitle = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  line-height: 35px;
  padding: 0 10px;
  color: ${colors.black_200};
  cursor: pointer;
`;

export const SelectUl = styled.ul<{ $isSlelctopen: boolean }>`
  max-height: 100px;
  display: ${(props) => (props.$isSlelctopen === true ? "block" : "none")};
  margin-top: 10px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  padding: 5px;
  background-color: ${colors.white};
  color: ${colors.black_200};
  overflow: scroll;

  & > li {
    text-decoration: none;
    padding: 5px 0;
    padding-left: 5px;
    cursor: pointer;
  }
  & > li:hover {
    background-color: antiquewhite;
    border-radius: 3px;
  }
`;

export const SelectLi = styled.ul<{ $isSelected: boolean }>`
  text-decoration: none;
  padding: 5px 0;
  padding-left: 5px;
  border-radius: 3px;

  cursor: ${(props) =>
    props.$isSelected === true ? "not-allowed" : "pointer"};

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
