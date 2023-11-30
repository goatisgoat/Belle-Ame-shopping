import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const AdminOrderContanier = styled.div`
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
