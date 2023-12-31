import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 70% 30%;

  @media only screen and (max-width: 800px) {
    display: block;
  }
`;

export const CartItems = styled.div`
  overflow-y: scroll;
  position: relative;
  @media only screen and (max-width: 800px) {
    height: calc(100vh - 89.2px);
  }
`;

export const Title = styled.div`
  margin: 30px 0;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  font-family: "Patrick Hand", "Noto Sans KR";
`;

export const HomeIconBtn = styled.div`
  position: absolute;
  top: 28px;
  left: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const ItemDiv = styled.div`
  margin: 0 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 80% 20%;
  border-bottom: 1px solid #adadad91;
  position: relative;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 80% 20%;
  }
`;

export const ProductImg = styled.img`
  width: 120px;
  height: 160px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
`;

export const Flex = styled.div`
  display: flex;
`;

export const NameSizeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 430px) {
    & > p:first-child {
      font-size: 17px;
    }
  }
`;

export const Qty = styled.div<{ $qty: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  & > button {
    margin: 0 10px;
    flex-shrink: 0;
    font-size: 15px;
  }

  & > button:disabled {
    color: ${(props) => (props.$qty ? colors.gray_100 : colors.black)};
  }

  @media only screen and (max-width: 430px) {
    display: none;
  }
`;

export const MobileQty = styled.div<{ $qty: number }>`
  display: none;

  @media only screen and (max-width: 430px) {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 15px;
    left: -10px;

    & > button {
      margin: 0 10px;
      flex-shrink: 0;
      font-size: 15px;
    }

    & > button:disabled {
      color: ${(props) => (props.$qty ? colors.gray_100 : colors.black)};
    }
  }
`;

export const QtyNumDiv = styled.div`
  width: 40px;
  height: 25px;
  border: 1px solid ${colors.gray_900};
  border-radius: 3px;
  color: ${colors.black};
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const DeleteBtn = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${colors.gray_100};
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${colors.cartDeleteBack};
`;

export const Order = styled.div`
  height: 100vh;
  padding: 20px;
  padding-top: 100px;
  background-color: ${colors.antiquewhite};

  @media only screen and (max-width: 800px) {
    height: auto;
    padding-top: 0;
    padding: 10px;
  }
`;

export const List = styled.div`
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

  @media only screen and (max-width: 800px) {
    margin-top: 10px;
  }
`;
export const NoCart = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;
