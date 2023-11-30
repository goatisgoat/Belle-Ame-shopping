import { useEffect, useRef } from "react";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getMyOrder } from "../../api/getMyOrder";
import { colors } from "../../style/theme/colors";
import * as S from "./MyOrderList.styled";
import { formatDate } from "../../utility/date";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyOrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { myOrderList } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getMyOrder({ navigate }));
  }, []);

  return (
    <S.Container>
      <Text size={20} bold={700} marginBottom={30}>
        Order List
      </Text>

      {myOrderList?.length ? (
        myOrderList?.map((list) => {
          type ColorKey = keyof typeof colors;
          const statusKey = list.status as ColorKey;

          return (
            <S.OrderListItem key={list._id}>
              <S.Img src={list.items[0].productId.image} />
              <S.InfoStatusFlex>
                <div>
                  <Text size={20} bold={700}>
                    주문번호: {list.orderNum}
                  </Text>
                  <Text marginBottom={15} size={14}>
                    {formatDate(list.createdAt)}
                  </Text>

                  {list.items.length > 1 ? (
                    <Text size={16} bold={400}>
                      {list.items[0].productId.name} 외
                      {String(list.items.length - 1)} 건
                    </Text>
                  ) : (
                    <Text size={16} bold={400}>
                      {list.items[0].productId.name}
                    </Text>
                  )}
                  <Text size={13}>
                    ₩ {String(list.totalPrice.toLocaleString())}
                  </Text>
                </div>

                <S.Status>
                  <Button
                    paddingSide="15"
                    borderRadius="20"
                    background={colors[statusKey]}
                    Fontcolor="#5c4e46"
                  >
                    {list.status}
                  </Button>
                </S.Status>
              </S.InfoStatusFlex>
            </S.OrderListItem>
          );
        })
      ) : (
        <S.NotFound>
          <Text>주문목록이 존재하지 않습니다.</Text>
        </S.NotFound>
      )}
    </S.Container>
  );
};

export default MyOrderList;
