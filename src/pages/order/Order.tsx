import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
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
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (!cartList) {
      navigate("/cart");
    }
  }, []);

  const handleInputOrder = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { id, value } = e.currentTarget;

    switch (id) {
      case "contact":
        if (value.length > 12) {
          value = shipInfo.contact;
        } else {
          value = value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
        }

        break;

      default:
    }

    setShipInfoError({
      ...shipInfoError,
      [id]: false,
    });

    setShipInfo({
      ...shipInfo,
      [id]: value,
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
  console.log(cartList, "cardValueError");

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

    const ssss = Number(contact.replace(/-/g, ""));

    const data = {
      totalPrice: getTotalPrice(),
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact: ssss },
      orderList: cartList?.map((item) => {
        return {
          productId: item.productId._id,
          qty: item.qty,
          size: item.size,
        };
      }),
    };

    console.log(data, "data");
  };

  const getTotalPrice = () => {
    const totalPrice = cartList?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.productId.price * currentObject.qty;
    }, 0);

    if (totalPrice === undefined) return "";
    return totalPrice;
  };

  return (
    <Container>
      <OrderInputs>
        <Title>배송 주소</Title>
        <NameFirstName>
          <div>
            <Text size="15">FirstName</Text>
            <Input
              id="firstName"
              type="text"
              value={shipInfo.firstName}
              onChange={handleInputOrder}
              isError={shipInfoError.firstName}
            />
          </div>
          <div>
            <Text size="15">LastName</Text>
            <Input
              id="lastName"
              type="text"
              value={shipInfo.lastName}
              onChange={handleInputOrder}
              isError={shipInfoError.lastName}
            />
          </div>
        </NameFirstName>
        <Contact>
          <Text size="15">contact</Text>

          <Input
            id="contact"
            type="text"
            value={shipInfo.contact}
            onChange={handleInputOrder}
            isError={shipInfoError.contact}
          />
        </Contact>
        <Address>
          <Text size="15">address</Text>

          <Input
            id="address"
            type="text"
            value={shipInfo.address}
            onChange={handleInputOrder}
            isError={shipInfoError.address}
          />
        </Address>

        <CityZip>
          <div>
            <Text size="15">city</Text>

            <Input
              id="city"
              type="text"
              value={shipInfo.city}
              onChange={handleInputOrder}
              isError={shipInfoError.city}
            />
          </div>
          <div>
            <Text size="15">zip</Text>

            <Input
              id="zip"
              type="text"
              value={shipInfo.zip}
              onChange={handleInputOrder}
              isError={shipInfoError.zip}
            />
          </div>
        </CityZip>
        <CardForm>
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
            <CardNum>
              <Text size="15">card number</Text>

              <Input
                id="number"
                type="number"
                value={cardValue.number}
                onChange={handleCardInput}
                isError={cardValueError.number}
              />
            </CardNum>
            <CardName>
              <Text size="15">name</Text>

              <Input
                id="name"
                type="text"
                value={cardValue.name}
                onChange={handleCardInput}
                isError={cardValueError.name}
              />
            </CardName>
            <MmddCvc>
              <div>
                <Text size="15">expiry</Text>

                <Input
                  id="expiry"
                  type="text"
                  value={cardValue.expiry}
                  onChange={handleCardInput}
                  isError={cardValueError.expiry}
                />
              </div>
              <div>
                <Text size="15">cvc</Text>

                <Input
                  id="cvc"
                  type="number"
                  value={cardValue.cvc}
                  onChange={handleCardInput}
                  isError={cardValueError.cvc}
                />
              </div>
            </MmddCvc>
          </div>
        </CardForm>
      </OrderInputs>
      <PayMents>
        <List>
          <Text>total ... ({String(cartLength)})</Text>
          <Text size={"13"}>₩ {getTotalPrice().toLocaleString()}</Text>
        </List>

        <OrderBtn onClick={handleOrder}>order</OrderBtn>
      </PayMents>
    </Container>
  );
};

export default Order;

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
  overflow-y: scroll;
  padding: 20px;
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

  @media only screen and (max-width: 700px) {
    margin-top: 10px;
  }
`;

/////

export const NameFirstName = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

export const Contact = styled.div`
  /* max-width: 50%; */

  margin-bottom: 20px;
`;

export const Address = styled.div`
  /* max-width: 50%; */

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

  & > div {
    /* border: 1px solid black; */
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

//
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
