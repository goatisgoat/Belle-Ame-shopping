import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getProductOne } from "../../api/getProductOne";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartSelect from "../../components/select/CartSelect";
import { createCart } from "../../api/createCart";

const ProductDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { productOne } = useSelector((state: RootState) => state.product);

  const [sizeList, setSizeList] = useState<string[] | null>(null);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("--");
  const [cartError, setCartError] = useState(false);

  useEffect(() => {
    if (id) dispatch(getProductOne({ id }));
  }, []);

  useEffect(() => {
    if (productOne) {
      const StockArray = Object.keys(productOne?.stock).map((i) => i);
      setSizeList(StockArray);
    }
  }, [productOne?._id]);

  const handleSize = (e: React.MouseEvent<HTMLElement>, i: string) => {
    const size = e.currentTarget.id;

    if (Number(productOne?.stock[i]) <= 0) {
      return setIsSizeOpen(false);
    }
    if (size !== "--") setCartError(false);

    setSelectedSize(size);
    setIsSizeOpen(false);
  };

  const handleOrder = () => {
    if (selectedSize === "--") return setCartError(true);

    dispatch(createCart({ productId: id, size: selectedSize, qty: 1 }));
  };
  return (
    <>
      <Container>
        <ImgDiv>
          <div>
            <img src={productOne?.image} />
          </div>
        </ImgDiv>
        <Info>
          <div>
            <Name>{productOne?.name}</Name>
            <Price>₩ {productOne?.price}</Price>

            <Description>{productOne?.description}</Description>

            <Size>
              <CartSelect
                list={sizeList || []}
                handleSelect={handleSize}
                setSelectOpen={setIsSizeOpen}
                defaultOption={selectedSize}
                isSelectOpen={isSizeOpen}
                error={cartError}
                stock={productOne?.stock}
              />
            </Size>
            <Order onClick={handleOrder}>order</Order>
          </div>
        </Info>
      </Container>
    </>
  );
};

export default ProductDetail;

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }
`;

export const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;

  & > div {
    width: 80%;
    height: 80%;
  }
  & > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 700px) {
    justify-content: center;
    & > div {
      width: 70%;
      height: 90%;
    }
  }
`;

export const Info = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 80%;
    height: 80%;
  }

  @media only screen and (max-width: 700px) {
    & > div {
      width: 70%;
      height: 90%;
      padding-bottom: 100px;
    }
  }
`;

export const Name = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

export const Price = styled.div`
  margin-bottom: 30px;
`;

export const Description = styled.div`
  margin-bottom: 50px;
`;

export const Size = styled.div`
  margin-bottom: 20px;
`;

export const Order = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 3px;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
`;
