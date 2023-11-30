import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import ModalSelect from "../modal/ModalSelect";

type props = {
  list: string[];
  handleSelect: (e: React.MouseEvent<HTMLElement>) => void;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectOpen: boolean;
  selectedList: string[];
  isError: boolean;
};

const MultiSelect = ({
  list,
  handleSelect,
  setSelectOpen,
  selectedList,
  isSelectOpen,
  isError,
}: props) => {
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const dropBox = dropBoxRef.current?.getBoundingClientRect();

  const top = dropBox?.top;
  const left = dropBox?.left;
  const width = dropBox?.width;

  return (
    <SelectTitle ref={dropBoxRef} $isError={isError}>
      <span>Category</span>

      <div onClick={() => setSelectOpen((pre) => !pre)}>
        {selectedList[0]
          ? selectedList[0] + ` ... (${selectedList.length})`
          : "--"}
      </div>
      <ModalSelect
        isOpen={isSelectOpen}
        top={top}
        left={left}
        width={width}
        setSelectOpen={setSelectOpen}
      >
        <SelectUl>
          {list.map((i) => (
            <SelectLi
              id={i}
              onClick={handleSelect}
              key={i}
              $isSelected={selectedList.includes(i)}
            >
              {i}
            </SelectLi>
          ))}
        </SelectUl>
      </ModalSelect>
    </SelectTitle>
  );
};

export default MultiSelect;

export const SelectTitle = styled.div<{ $isError: boolean }>`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  border: 1px solid ${colors.inputBorder};
  border-color: ${(props) =>
    props.$isError === true ? "#f86c6c" : `${colors.inputBorder}`};
  border-radius: 3px;
  color: ${colors.black_200};
  line-height: 35px;
  cursor: pointer;
  position: relative;
  z-index: 1;

  & > span {
    padding: 0 5px;
    position: absolute;
    left: 8px;
    top: -18px;
    font-size: 13px;
    color: ${colors.basicWithBrown};
    background-color: ${colors.white};
    transition: 0.3s;
    z-index: -1;
  }
`;

export const SelectUl = styled.ul<{}>`
  max-height: 100px;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  color: ${colors.black_200};
  background-color: ${colors.white};
  overflow: scroll;
`;

export const SelectLi = styled.li<{ $isSelected: boolean }>`
  padding: 5px 0;
  padding-left: 5px;
  border-radius: 3px;
  //
  color: ${(props) =>
    props.$isSelected === true ? `${colors.white}` : `${colors.black_200}`};

  background-color: ${(props) =>
    props.$isSelected === true ? `${colors.modalOuter}` : "none"};

  cursor: ${(props) =>
    props.$isSelected === true ? "not-allowed" : "pointer"};
  //
  &:hover {
    background-color: ${(props) =>
      props.$isSelected === true
        ? `${colors.modalOuter}`
        : `${colors.antiquewhite}`};

    border-radius: 3px;
  }
`;
