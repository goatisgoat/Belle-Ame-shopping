import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  max-width: 1200px;
  height: calc(100vh - 35px - 60px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 70% 30%;

  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

export const OrderInputs = styled.div`
  padding: 20px;
  overflow-y: scroll;
  @media only screen and (max-width: 700px) {
    min-height: calc(100vh - 96px);
    max-height: calc(100vh - 96px);
  }
`;

export const Title = styled.div`
  margin: 30px 0;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
`;

export const PayMents = styled.div`
  height: 100vh;
  padding: 20px;
  padding-top: 100px;
  background-color: ${colors.antiquewhite};

  @media only screen and (max-width: 700px) {
    height: auto;
    padding-top: 0;
    padding: 10px;
  }
`;

export const SpaceFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const OrderBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: ${colors.black};
  color: ${colors.white};

  &:disabled {
    background-color: ${colors.gray_100};
  }

  @media only screen and (max-width: 700px) {
    margin-top: 10px;
  }
`;

//주문
export const NameFirstName = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

export const Contact = styled.div`
  margin-bottom: 20px;
`;

export const Address = styled.div`
  margin-bottom: 20px;
`;

export const CityZip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 30px;
`;

export const CardForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

//카드정보
export const MmddCvc = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

export const CardNum = styled.div`
  margin-bottom: 10px;
`;

export const CardName = styled.div`
  margin-bottom: 10px;
`;
