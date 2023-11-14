import styled from "styled-components";
import { colors } from "../../style/theme/colors";

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

export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SkuName = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 20px;

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Description = styled.div`
  margin-bottom: 5px;
`;

export const StokeDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > div {
    margin-right: 10px;
  }
`;

export const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;

  & > div {
    margin-right: 10px;
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

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
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
  margin-bottom: 15px;
  &:focus-within {
    border: 2px solid ${colors.inputFocus};
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  & > span {
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
