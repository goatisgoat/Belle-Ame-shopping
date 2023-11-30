import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import { zIndex } from "../../utility/zIndex";

export const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  width: 280px;
  height: 100vh;
  padding: 10px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${colors.white};
  z-index: ${zIndex.adminManu};

  position: relative;

  @media only screen and (max-width: 1000px) {
    width: 100px;
  }

  @media only screen and (max-width: 700px) {
    /* width: 100vw;
    height: 60px;
    padding-right: 10px;
    top: 0;
    border: none;
    border-bottom: 1px solid ${colors.adminMenuBorder};
    display: flex;
    justify-content: end;
    align-items: center; */

    display: none;
  }
`;

export const HomeBtn = styled.div`
  padding: 15px 0;
  padding-left: 30px;
  margin-bottom: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > span {
    margin-left: 10px;
  }

  @media only screen and (max-width: 1000px) {
    padding: 0;
    text-align: center;
    justify-content: center;

    & > span {
      display: none;
    }
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
