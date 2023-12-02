import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { getProductOne } from "../../api/getProductOne";
import { useNavigate, useParams } from "react-router-dom";
import CartSelect from "../../components/select/CartSelect";
import { createCart } from "../../api/createCart";
import * as S from "./ProductDetail.styled";
import { StockList } from "../../utility/utils";
import { createToastify } from "../../redux/modules/toastifySlice";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { userState } = useSelector((state: RootState) => state.user);
  const { productOne } = useSelector((state: RootState) => state.product);

  const [sizeList, setSizeList] = useState<string[] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [cartError, setCartError] = useState<boolean>(false);

  const [qty, setQty] = useState<number>(1);

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

  const handleSize = (size: string) => {
    if (Number(productOne?.stock[size]) <= 0) {
      return setSelectedSize("");
    }

    setCartError(false);
    setSelectedSize(size);
  };

  const handleQty = (type: string) => {
    if (type === "plus") {
      return setQty(qty + 1);
    }

    if (type === "minus") {
      return setQty(qty - 1);
    }
  };

  const handleOrder = () => {
    if (!userState._id) {
      return dispatch(
        createToastify({
          status: "success",
          message: "로그인 후 이용해주세요.",
        })
      );
    }
    if (selectedSize === "") return setCartError(true);

    dispatch(
      createCart({ productId: id, size: selectedSize, qty: qty, navigate })
    );
  };

  const [startY, setStartY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const [upToOpen, setUpToOpen] = useState(false);

  const handleTouchStart = (e: any) => {
    setDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: any) => {
    if (!dragging) return "";

    const currentY = e.touches[0].clientY;
    const upOffsetY = startY - currentY;
    const downOffsetY = currentY - startY;

    if (startY > currentY && upOffsetY > 30) {
      setUpToOpen(true);
      setDragging(false);
    }

    if (startY < currentY && downOffsetY > 30) {
      setUpToOpen(false);
      setDragging(false);
    }
  };

  const handleTouchEnd = () => {
    // setDragging(false);
  };

  return (
    <>
      <S.Container>
        <S.ImgDiv>
          <div>
            <img src={productOne?.image} />
          </div>
        </S.ImgDiv>
        <S.Info $upToOpen={upToOpen}>
          <div>
            <S.TitlePrice>
              <S.MobileScrollEvent
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              />
              <Text size={22} bold={500}>
                {productOne?.name || ""}
              </Text>

              <Text size={15}>
                {String(productOne?.price.toLocaleString()) || ""}
              </Text>
            </S.TitlePrice>

            <S.Description>
              <Text size={15}>{productOne?.description || ""}</Text>
            </S.Description>

            <S.Size>
              <Text size={13} marginRight={20}>
                Size
              </Text>
              {sizeList?.map((s, i) => (
                <S.SizeBtn
                  key={i}
                  onClick={() => handleSize(s)}
                  $cartError={cartError}
                  $isSelected={selectedSize === s}
                  $isOutOfStock={
                    Number(productOne?.stock[s]) <= 0 ? true : false
                  }
                >
                  {s}
                </S.SizeBtn>
              ))}
            </S.Size>

            <S.Qty>
              <Text size={13} marginRight={20}>
                Qty
              </Text>
              <button disabled={qty === 1} onClick={() => handleQty("minus")}>
                <RemoveIcon style={{ fontSize: 13 }} />
              </button>
              <S.QtyNumDiv>{qty}</S.QtyNumDiv>
              <button onClick={() => handleQty("plus")}>
                <AddIcon style={{ fontSize: 14 }} />
              </button>
            </S.Qty>

            <S.Order onClick={handleOrder}>order</S.Order>
          </div>
        </S.Info>
      </S.Container>
    </>
  );
};

export default ProductDetail;
