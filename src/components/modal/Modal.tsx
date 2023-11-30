import React, { ReactNode } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import { zIndex } from "../../utility/zIndex";
import { colors } from "../../style/theme/colors";

//
export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, setSelectOpen }: ModalProps) => {
  return (
    <ModalPortal>
      {isOpen ? (
        <ModalOuter>
          <InnerModal>{children}</InnerModal>
        </ModalOuter>
      ) : null}
    </ModalPortal>
  );
};

export default Modal;

export const ModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.modalOuter};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.modalBackground};
`;

export const InnerModal = styled.div`
  width: 500px;
  height: 550px;
  padding: 15px;
  background-color: ${colors.white};
  overflow-y: auto;
  border-radius: 8px;
  position: relative;

  @media only screen and (max-width: 500px) {
    width: 100vw;
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
