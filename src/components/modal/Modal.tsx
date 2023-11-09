import { ReactNode } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  top: number | undefined;
  left: number | undefined;
  width: number | undefined;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({
  children,
  isOpen,
  top,
  left,
  setSelectOpen,
  width,
}: ModalProps) => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const divStyle = {
    top: `${top !== undefined && top + 30}px`,
    left: `${left}px`,
    width: `${width}px`,
  };

  return (
    <ModalPortal>
      {isOpen ? (
        <ModalOuter onClick={() => setSelectOpen(false)}>
          <ModalDiv
            onClick={handleClose}
            $top={Number(top?.toFixed(0))}
            $left={left}
            style={divStyle}
          >
            {children}
          </ModalDiv>
        </ModalOuter>
      ) : null}
    </ModalPortal>
  );
};

export default Modal;

export const ModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: #8080806e; */
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

export const ModalDiv = styled.div<{
  $top: number | undefined;
  $left: number | undefined;
}>`
  position: absolute;
  width: 136px;
`;
