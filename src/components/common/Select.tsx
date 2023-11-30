import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import ModalSelect from "../modal/ModalSelect";

type props = {
  list: string[];
  handleSelect: (e: React.MouseEvent<HTMLElement>) => void;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectOpen: boolean;
  defaultOption: string | null;
};

const Select = ({
  list,
  handleSelect,
  setSelectOpen,
  defaultOption,
  isSelectOpen,
}: props) => {
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const dropBox = dropBoxRef.current?.getBoundingClientRect();

  const top = dropBox?.top;
  const left = dropBox?.left;
  const width = dropBox?.width;

  return (
    <SelectTitle ref={dropBoxRef}>
      <div onClick={() => setSelectOpen((pre) => !pre)}>
        {defaultOption || "--"}
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
              $isSelected={i === defaultOption}
            >
              {i}
            </SelectLi>
          ))}
        </SelectUl>
      </ModalSelect>
    </SelectTitle>
  );
};

export default Select;

export const SelectTitle = styled.div`
  width: 100%;
  height: 35px;
  padding: 0 10px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  line-height: 35px;
  cursor: pointer;

  & > div {
    color: ${colors.black_200};
  }
`;

export const SelectUl = styled.ul`
  max-height: 100px;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  background-color: ${colors.white};
  color: ${colors.black_200};
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
