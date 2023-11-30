import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media only screen and (max-width: 780px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }
`;

export const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;

  & > div {
    width: 80%;
    height: 80%;
  }
  & > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 780px) {
    justify-content: center;
    & > div {
      width: 70%;
      height: 90%;
    }
  }
`;

export const Info = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 80%;
    height: 80%;
  }

  @media only screen and (max-width: 780px) {
    & > div {
      width: 70%;
      height: 90%;
      padding-bottom: 100px;
    }
  }
`;

export const Name = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

export const Price = styled.div`
  margin-bottom: 30px;
`;

export const Description = styled.div`
  margin-bottom: 50px;
`;

export const Size = styled.div`
  margin-bottom: 20px;
`;

export const Order = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 3px;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
`;
