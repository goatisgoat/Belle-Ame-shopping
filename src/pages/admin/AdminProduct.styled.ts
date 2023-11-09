import styled from "styled-components";
import { colors } from "../../style/theme/colors";

////
export const Search = styled.div`
  width: 90%;
  height: 35px;
  padding-left: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.gray_900};
  border-radius: 3px;

  & > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

export const CreateBtnAdmin = styled.div`
  width: 90%;
  display: flex;

  & > button {
    padding: 10px 15px;
    border-radius: 3px;
    color: ${colors.basicWithBrown};
    background-color: ${colors.basic};
    cursor: pointer;
  }
`;

//
export const AdminContanier = styled.div`
  width: calc(100% - 280px);
  height: 100vh;
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 1000px) {
    width: calc(100% - 100px);
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    height: calc(100vh - 60px);
  }
`;

//
export const OuterModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.modalOuter};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  /* @media only screen and (max-width: 500px) {
    width: 100vw;
    height: 100vh;
    background-color: ${colors.modalOuter};
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  } */
`;
export const InnerModal = styled.div`
  width: 500px;
  height: 550px;
  padding: 15px;
  background-color: ${colors.white};
  overflow-y: auto;
  border-radius: 3px;

  @media only screen and (max-width: 500px) {
    width: 100vw;
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

//
export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;

  & > div {
    color: ${colors.gray_400};
  }
  & > button {
    cursor: pointer;
  }
`;

export const SkuName = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 20px;

  & > div {
    color: ${colors.gray_300};
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Description = styled.div`
  & > div {
    color: ${colors.gray_300};
  }
  margin-bottom: 5px;
`;

////
export const InputDiv = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;

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

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 5px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  color: ${colors.black_200};
  resize: none;
  outline: none;
  margin-bottom: 20px;
  &:focus-within {
    border: 2px solid ${colors.inputFocus};
  }
`;

///
export const StokeDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > div {
    margin-right: 10px;
    color: ${colors.gray_300};
  }

  & > button {
    padding: 8px 10px;
    border-radius: 3px;
    background-color: ${colors.basic};
    color: ${colors.basicWithBrown};
    cursor: pointer;
  }
`;

///
export const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;

  & > div {
    margin-right: 10px;
    color: ${colors.gray_300};
  }

  & > button {
    padding: 8px 10px;
    border-radius: 3px;
    background-color: ${colors.basic};
    color: ${colors.basicWithBrown};
    cursor: pointer;
  }
`;
export const ProductImg = styled.div`
  margin-bottom: 40px;

  & > img {
    margin-top: 10px;
    width: 200px;
    height: 300px;
    object-fit: cover;
  }
`;

export const SelectDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;

  & > div > div {
    color: ${colors.gray_300};
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

///
export const CreateBtn = styled.button`
  padding: 10px 15px;
  border-radius: 3px;
  background-color: ${colors.basic};
  color: ${colors.basicWithBrown};
  cursor: pointer;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  & > div {
    margin-right: 5px;
  }
`;

//table
export const TableImg = styled.img`
  width: 120px;
  object-fit: cover;
`;

export const TableDeleteEdit = styled.div`
  & > button {
    margin-right: 10px;
    margin-top: 10px;
    padding: 3px 8px;
    border-radius: 15px;
    font-size: 13px;
    color: white;
  }

  & > button:first-child {
    border: 1px solid red;
    background-color: red;
  }
  & > button:last-child {
    border: 1px solid blue;
    background-color: blue;
  }
`;
