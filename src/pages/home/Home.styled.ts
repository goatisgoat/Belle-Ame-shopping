import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const MainContainer = styled.div`
  padding-top: 70px;
`;

export const Banner = styled.div`
  width: 100%;
`;

export const BannerImg = styled.img`
  width: 100%;
  object-fit: cover;

  @media only screen and (max-width: 600px) {
    /* height: 80vh; */
  }
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
export const SearchDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 30px;
  & > div {
    width: 300px;
  }
`;

export const Search = styled.div`
  width: 90%;
  height: 35px;
  padding-left: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.gray_900};
  border-radius: 3px;
  margin: 0 auto;

  & > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

//
export const NamePrice = styled.div`
  padding-top: 5px;
  & > span {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
