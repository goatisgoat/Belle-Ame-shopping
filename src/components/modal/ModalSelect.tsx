import { ReactNode } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import { zIndex } from "../../utility/zIndex";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  top: number | undefined;
  left: number | undefined;
  width: number | undefined;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalSelect = ({
  children,
  isOpen,
  top,
  left,
  width,
  setSelectOpen,
}: ModalProps) => {
  const divStyle = {
    top: `${top !== undefined && top + 30}px`,
    left: `${left}px`,
    width: `${width}px`,
  };

  return (
    <ModalPortal>
      {isOpen ? (
        <ModalOuter onClick={() => setSelectOpen(false)}>
          <ModalInner onClick={(e) => e.stopPropagation()} style={divStyle}>
            {children}
          </ModalInner>
        </ModalOuter>
      ) : null}
    </ModalPortal>
  );
};

export default ModalSelect;

export const ModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.modalBackground};
`;

export const ModalInner = styled.div<{}>`
  position: absolute;
`;
