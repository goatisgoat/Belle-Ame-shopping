import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getMyCart } from "../../api/getMyCart";
import Text from "../../components/common/Text";
import { updateCartQty } from "../../api/updateCartQty";
import { deleteCartItem } from "../../api/deleteCartItem";
import * as S from "./CartDetail.styled";
import { Navigate, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const CartDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const { userState } = useSelector((state: RootState) => state.user);

  const { cartLength, cartList } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(getMyCart({ navigate }));
    }
  }, []);

  const getTotalPrice = () => {
    const totalPrice = cartList?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.productId.price * currentObject.qty;
    }, 0);

    if (totalPrice === undefined) return "";
    return totalPrice?.toLocaleString();
  };

  const handleQty = (cartId: string, type: string) => {
    dispatch(
      updateCartQty({
        cartId,
        type,
        navigate,
      })
    );
  };

  const handleDelete = (cartId: string) => {
    dispatch(
      deleteCartItem({
        cartId,
        navigate,
      })
    );
  };

  const handleOrder = () => {
    navigate("/order/payment");
  };

  if (!accessToken || !refreshToken) {
    return <Navigate to={"/login"} />;
  }

  return (
    <S.Container>
      <S.CartItems>
        <S.Title>My Cart</S.Title>
        <S.HomeIconBtn onClick={() => navigate("/")}>
          <HomeIcon style={{ cursor: "pointer" }} />
        </S.HomeIconBtn>

        {cartLength === 0 && (
          <S.NoCart>
            <Text size={15}>상품이 존재하지 않습니다.</Text>
          </S.NoCart>
        )}

        {cartLength !== 0 &&
          cartList?.map((c, i) => (
            <S.ItemDiv key={i}>
              <S.Flex>
                <S.ProductImg src={c.productId.image} />
                <S.NameSizeColumn>
                  <Text size={20} bold={700}>
                    {c.productId.name}
                  </Text>
                  <Text size={13}>Size: {c.size}</Text>
                  <S.MobilePrice>
                    <Text size={12}>
                      ₩ {c.productId.price.toLocaleString()}
                    </Text>
                  </S.MobilePrice>
                </S.NameSizeColumn>
              </S.Flex>

              <S.Qty $qty={c.qty}>
                <button
                  disabled={c.qty === 1}
                  onClick={() => handleQty(c._id, "minus")}
                >
                  -
                </button>
                <S.QtyNumDiv>{c.qty}</S.QtyNumDiv>
                <button onClick={() => handleQty(c._id, "plus")}>+</button>
              </S.Qty>

              <S.Price>
                <Text size={13}>₩ {c.productId.price.toLocaleString()}</Text>
              </S.Price>
              <S.DeleteBtn onClick={() => handleDelete(c._id)}>-</S.DeleteBtn>
            </S.ItemDiv>
          ))}
      </S.CartItems>
      <S.Order>
        <S.List>
          <Text>total ... ({String(cartLength) || ""})</Text>
          <Text size={13}>₩ {getTotalPrice()}</Text>
        </S.List>

        <S.OrderBtn onClick={handleOrder} disabled={cartLength === 0}>
          order
        </S.OrderBtn>
      </S.Order>
    </S.Container>
  );
};

export default CartDetail;
