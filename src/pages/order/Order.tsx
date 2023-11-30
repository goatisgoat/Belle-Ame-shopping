import { ChangeEvent, useEffect, useState } from "react";
import Text from "../../components/common/Text";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Input from "../../components/common/Input";
import { cc_expires_format } from "../../utility/number";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import {
  CardValue,
  CardValueError,
  ShipInfo,
  ShipInfoError,
} from "../../models/order.types";
import { createToastify } from "../../redux/modules/toastifySlice";
import { Navigate, useNavigate } from "react-router-dom";
import * as S from "./Order.styled";
import { createOrder } from "../../api/createOrder";
import Select from "../../components/common/Select";
import { couponCategory } from "../../components/admin/ModalCoupon";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //modal
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { cartLength, cartList } = useSelector(
    (state: RootState) => state.cart
  );

  const [shipInfo, setShipInfo] = useState<ShipInfo>({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const [shipInfoError, setShipInfoError] = useState<ShipInfoError>({
    firstName: false,
    lastName: false,
    contact: false,
    address: false,
    city: false,
    zip: false,
  });

  const [cardValue, setCardValue] = useState<CardValue>({
    cvc: "",
    expiry: "",
    focus: "number",
    name: "",
    number: "",
  });

  const [cardValueError, setCardValueError] = useState<CardValueError>({
    cvc: false,
    expiry: false,
    focus: false,
    name: false,
    number: false,
  });

  const handleInputOrder = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { id, value } = e.currentTarget;

    switch (id) {
      case "contact":
        if (value.length > 12) {
          value = shipInfo.contact;
        } else {
          value = value
            .replace(/\D/g, "")
            .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
        }
        break;

      default:
    }

    setShipInfo({
      ...shipInfo,
      [id]: value,
    });

    setShipInfoError({
      ...shipInfoError,
      [id]: false,
    });
  };

  const handleCardInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { id, value } = e.currentTarget;

    setCardValueError({
      ...cardValueError,
      [id]: false,
    });

    switch (id) {
      case "number":
        if (value.length > 16) {
          return setCardValue({ ...cardValue });
        } else {
          setCardValue({
            ...cardValue,
            [id]: value,
            focus: "number",
          });
        }
        break;

      case "name":
        setCardValue({
          ...cardValue,
          [id]: value,
          focus: "name",
        });
        break;

      case "expiry":
        value = cc_expires_format(value);

        setCardValue({
          ...cardValue,
          [id]: value,
          focus: "expiry",
        });
        break;

      case "cvc":
        if (value.length > 3) {
          return setCardValue({
            ...cardValue,
          });
        }
        setCardValue({
          ...cardValue,
          [id]: value,
          focus: "cvc",
        });
        break;
      default:
    }
  };

  const handleCoupon = () => {};

  const handleOrder = () => {
    const { firstName, lastName, contact, address, city, zip } = shipInfo;

    const { cvc, expiry, name, number } = cardValue;

    if (
      !(
        firstName &&
        lastName &&
        contact &&
        address &&
        city &&
        zip &&
        cvc &&
        expiry &&
        name &&
        number
      )
    ) {
      setShipInfoError({
        firstName: firstName ? false : true,
        lastName: lastName ? false : true,
        contact: contact ? false : true,
        address: address ? false : true,
        city: city ? false : true,
        zip: zip ? false : true,
      });

      setCardValueError({
        cvc: cvc ? false : true,
        expiry: expiry ? false : true,
        focus: false,
        name: name ? false : true,
        number: number ? false : true,
      });

      return dispatch(
        createToastify({ status: "error", message: "내용을 입력해주세요" })
      );
    }

    if (
      String(number).length !== 16 ||
      String(expiry).length !== 5 ||
      String(cvc).length !== 3
    ) {
      return setCardValueError({
        ...cardValueError,
        number: String(number).length !== 16,
        expiry: String(expiry).length !== 5,
        cvc: String(cvc).length !== 3,
      });
    }

    const deleteHyphen = Number(contact.replace(/-/g, ""));

    const totalData = {
      totalPrice: getTotalPrice(),
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact: deleteHyphen },
      orderList: cartList?.map((item) => {
        return {
          productId: item.productId._id,
          size: item.size,
          qty: item.qty,
          price: item.productId.price,
        };
      }),
    };

    dispatch(createOrder({ totalData, navigate }));
  };

  const getTotalPrice = () => {
    const totalPrice = cartList?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.productId.price * currentObject.qty;
    }, 0);

    if (totalPrice === undefined) return "";
    return totalPrice;
  };

  const getDiscountedPrice = () => {
    const totalPrice = cartList?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.productId.price * currentObject.qty;
    }, 0);

    if (totalPrice === undefined) return "";
    return totalPrice - 4000;
  };

  useEffect(() => {
    if (!cartList?.length) {
      navigate("/cart");
    }
  }, []);

  return (
    <S.Container>
      <S.OrderInputs>
        <S.Title>배송 주소</S.Title>
        <S.NameFirstName>
          <div>
            <Text size={15}>FirstName</Text>
            <Input
              id="firstName"
              type="text"
              value={shipInfo.firstName}
              onChange={handleInputOrder}
              isError={shipInfoError.firstName}
            />
          </div>
          <div>
            <Text size={15}>LastName</Text>
            <Input
              id="lastName"
              type="text"
              value={shipInfo.lastName}
              onChange={handleInputOrder}
              isError={shipInfoError.lastName}
            />
          </div>
        </S.NameFirstName>
        <S.Contact>
          <Text size={15}>contact</Text>

          <Input
            id="contact"
            type="text"
            value={shipInfo.contact}
            onChange={handleInputOrder}
            isError={shipInfoError.contact}
          />
        </S.Contact>
        <S.Address>
          <Text size={15}>address</Text>

          <Input
            id="address"
            type="text"
            value={shipInfo.address}
            onChange={handleInputOrder}
            isError={shipInfoError.address}
          />
        </S.Address>

        <S.CityZip>
          <div>
            <Text size={15}>city</Text>

            <Input
              id="city"
              type="text"
              value={shipInfo.city}
              onChange={handleInputOrder}
              isError={shipInfoError.city}
            />
          </div>
          <div>
            <Text size={15}>zip</Text>
            <Input
              id="zip"
              type="text"
              value={shipInfo.zip}
              onChange={handleInputOrder}
              isError={shipInfoError.zip}
            />
          </div>
        </S.CityZip>

        {/* <S.Coupon>
          <Text size={15}>Coupon</Text>
          <Select
            list={couponCategory}
            handleSelect={handleCoupon}
            isSelectOpen={isCategoryOpen}
            setSelectOpen={setIsCategoryOpen}
            defaultOption={"asdad"}
          />
        </S.Coupon> */}

        <S.CardForm>
          <div>
            <Cards
              cvc={cardValue.cvc}
              expiry={cardValue.expiry}
              focused={cardValue.focus}
              name={cardValue.name}
              number={cardValue.number}
            />
          </div>
          <div>
            <S.CardNum>
              <Text size={15}>card number</Text>

              <Input
                id="number"
                type="number"
                value={cardValue.number}
                onChange={handleCardInput}
                isError={cardValueError.number}
              />
            </S.CardNum>
            <S.CardName>
              <Text size={15}>name</Text>

              <Input
                id="name"
                type="text"
                value={cardValue.name}
                onChange={handleCardInput}
                isError={cardValueError.name}
              />
            </S.CardName>
            <S.MmddCvc>
              <div>
                <Text size={15}>expiry</Text>

                <Input
                  id="expiry"
                  type="text"
                  value={cardValue.expiry}
                  onChange={handleCardInput}
                  isError={cardValueError.expiry}
                />
              </div>
              <div>
                <Text size={15}>cvc</Text>

                <Input
                  id="cvc"
                  type="number"
                  value={cardValue.cvc}
                  onChange={handleCardInput}
                  isError={cardValueError.cvc}
                />
              </div>
            </S.MmddCvc>
          </div>
        </S.CardForm>
      </S.OrderInputs>
      <S.PayMents>
        <Hidden>
          <S.SpaceFlex>
            <Text size={13}>총 상품금액</Text>
            <Text size={13}>{getTotalPrice().toLocaleString()}원</Text>
          </S.SpaceFlex>
          <S.SpaceFlex>
            <Text size={13}>총 할인금액</Text>
            <Text size={13} marginBottom={20}>
              - 4,000원
            </Text>
          </S.SpaceFlex>
        </Hidden>
        <S.SpaceFlex>
          <Text size={13}>결제금액</Text>
          <Text size={15} bold={600}>
            {getDiscountedPrice().toLocaleString()}원
          </Text>
        </S.SpaceFlex>
        <S.OrderBtn onClick={handleOrder}>order</S.OrderBtn>
      </S.PayMents>
    </S.Container>
  );
};

export default Order;

export const LineThrough = styled.span`
  text-decoration: line-through;
`;
export const DisCountedPrice = styled.div`
  display: flex;
  justify-content: end;
`;

export const Hidden = styled.div`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
