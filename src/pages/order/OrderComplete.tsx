import { useEffect } from "react";
import styled from "styled-components";
import Text from "../../components/common/Text";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../style/theme/colors";

const OrderComplete = () => {
  const { orderSucessString } = useSelector((state: RootState) => state.order);

  return (
    <Container>
      <Text size={20} bold={700}>
        주문이 완료되었습니다.
      </Text>
      <Text>주문번호 - {orderSucessString}</Text>
      <HomeLink to={"/"}>Home으로 돌아가기</HomeLink>
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
  background-color: ${colors.white};

  & > span {
    margin-bottom: 10px;
  }
`;

export const HomeLink = styled(Link)`
  font-size: 13px;
  margin-top: 20px;

  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: ${colors.haveAccount};
  }
`;
