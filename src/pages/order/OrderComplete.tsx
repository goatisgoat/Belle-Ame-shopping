import { useEffect } from "react";
import styled from "styled-components";
import Text from "../../components/common/Text";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();
  const { orderSucessString } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (!orderSucessString) {
      navigate("/cart");
    }
  }, []);

  return (
    <Container>
      <Text size="20" bold="700">
        주문이 완료되었습니다.
      </Text>
      <Text>주문번호 - {orderSucessString}</Text>
    </Container>
  );
};

export default OrderComplete;

export const Container = styled.div`
  width: 80%;
  height: 300px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;

  & > span {
    margin-bottom: 10px;
  }
`;
