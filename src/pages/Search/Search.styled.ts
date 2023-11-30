import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  padding-top: 100px;
`;

export const SearchContainer = styled.div`
  width: 90%;
  height: 35px;
  padding-left: 10px;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 3px;
  border-bottom: 1px solid ${colors.gray_900};

  & > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

export const CategorysImgDiv = styled.div`
  display: flex;
  margin: 50px 0;
  margin-top: 100px;
  overflow-x: scroll;
  align-items: center;
  padding: 0 10px;
`;

export const FLexColumn = styled.div`
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const CategorysImg = styled.img`
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${colors.antiquewhite};
`;

export const Items = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 10px;
  }

  @media only screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 10px;
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 10px;
  }
`;

export const Item = styled.div`
  height: 600px;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 90%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: 10px;
  }

  & > div {
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
  }

  @media only screen and (max-width: 1200px) {
    height: calc(100vw / 3 * 1.5);
  }

  @media only screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    height: calc(100vw / 3 * 2);
  }
  @media only screen and (max-width: 500px) {
    height: calc(100vw / 3 * 4);
  }
`;

//
export const NamePrice = styled.div`
  padding-top: 5px;
  & > p {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const EmptyItems = styled.div`
  display: flex;
  justify-content: center;
`;
