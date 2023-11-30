import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  margin: 30px 0;
  margin-bottom: 50px;
  text-align: center;
  font-size: 25px;
  font-family: "Patrick Hand", "Noto Sans KR";
`;

export const OrderListItem = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  border-bottom: 1px solid #adadad91;
`;

export const Img = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;

  @media only screen and (max-width: 400px) {
    width: 70px;
    height: 100px;
  }
`;

export const InfoStatusFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 500px) {
    & > button {
      display: none;
    }
  }
`;
export const MoBilePrice = styled.div`
  display: none;
  margin-top: 10px;

  @media only screen and (max-width: 500px) {
    display: block;
  }
`;

export const NotFound = styled.div`
  margin-top: 30px;
`;
