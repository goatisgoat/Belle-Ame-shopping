import { useEffect } from "react";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getMyOrder } from "../../api/getMyOrder";
import { colors } from "../../style/theme/colors";
import * as S from "./MyOrderList.styled";
import { formatDate } from "../../utility/date";

const MyOrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myOrderList } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getMyOrder({}));
  }, []);

  return (
    <S.Container>
      <Text size="20" bold="700" marginBottom="30px">
        Order List
      </Text>

      {myOrderList
        ? myOrderList?.map((list) => {
            type ColorKey = keyof typeof colors;
            const statusKey = list.status as ColorKey;

            return (
              <S.OrderListItem key={list._id}>
                <S.Img src={list.items[0].productId.image} />
                <S.InfoStatusFlex>
                  <div>
                    <Text size="20" bold="700">
                      주문번호: {list.orderNum}
                    </Text>
                    <Text marginBottom="15px" size="14">
                      {formatDate(list.createdAt)}
                    </Text>

                    {list.items.length > 1 ? (
                      <Text size="16" bold="700">
                        {list.items[0].productId.name} 외
                        {String(list.items.length - 1)} 건
                      </Text>
                    ) : (
                      <Text size="16" bold="700">
                        {list.items[0].productId.name}
                      </Text>
                    )}
                    <Text size="13">
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
        : null}
    </S.Container>
  );
};

export default MyOrderList;
