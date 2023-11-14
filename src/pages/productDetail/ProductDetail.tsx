import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getProductOne } from "../../api/getProductOne";
import { useParams } from "react-router-dom";
import CartSelect from "../../components/select/CartSelect";
import { createCart } from "../../api/createCart";
import * as S from "./ProductDetail.styled";
import { StockList } from "../../utility/utils";

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
      const sortedArr: string[] = [];
      const StockArray = Object.keys(productOne?.stock).map((i) => i);

      StockList.forEach((s) => StockArray.includes(s) && sortedArr.push(s));

      setSizeList(sortedArr);
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
      <S.Container>
        <S.ImgDiv>
          <div>
            <img src={productOne?.image} />
          </div>
        </S.ImgDiv>
        <S.Info>
          <div>
            <S.Name>{productOne?.name}</S.Name>
            <S.Price>₩ {productOne?.price}</S.Price>

            <S.Description>{productOne?.description}</S.Description>

            <S.Size>
              <CartSelect
                list={sizeList || []}
                handleSelect={handleSize}
                setSelectOpen={setIsSizeOpen}
                defaultOption={selectedSize}
                isSelectOpen={isSizeOpen}
                error={cartError}
                stock={productOne?.stock}
              />
            </S.Size>
            <S.Order onClick={handleOrder}>order</S.Order>
          </div>
        </S.Info>
      </S.Container>
    </>
  );
};

export default ProductDetail;
