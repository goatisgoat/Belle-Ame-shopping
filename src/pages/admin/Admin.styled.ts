import styled from "styled-components";
import { colors } from "../../style/theme/colors";

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
  border-right: 1px solid ${colors.adminMenuBorder};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.white};
  z-index: 99999999999999999999999999;
  @media only screen and (max-width: 1000px) {
    width: 100px;
  }

  @media only screen and (max-width: 700px) {
    width: 100vw;
    height: 60px;
    padding-right: 10px;
    top: 0;
    border: none;
    border-bottom: 1px solid ${colors.adminMenuBorder};
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

export const HomeBtn = styled.div`
  padding-left: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;

  @media only screen and (max-width: 1000px) {
    padding: 0;
    text-align: center;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
