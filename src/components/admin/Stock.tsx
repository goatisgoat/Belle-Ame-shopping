import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StockSelect from "../select/StockSelect";
import { Stoke } from "../../models/product.type";

const StockList = ["XS", "S", "M", "L", "XL"];

type Props = {
  indexNum: number;
  stock: Stoke;
  stokes: Stoke[];
  setStokes: React.Dispatch<React.SetStateAction<Stoke[]>>;
  setStockError: React.Dispatch<React.SetStateAction<boolean>>;
};

const Stock = ({
  indexNum,
  stock,
  stokes,
  setStokes,
  setStockError,
}: Props) => {
  const [isStockOpen, setIsStockOpen] = useState(false);
  const qty = stock.quantity === null ? undefined : stock.quantity;

  const handleStock = (e: React.MouseEvent<HTMLElement>) => {
    const size = e.currentTarget.id;

    if (stokes.some((s) => s.size === size)) {
      return setIsStockOpen(false);
    }

    setStokes((pre) => {
      const updateSize = pre.map((s, i) =>
        i === indexNum ? { ...s, size: size } : s
      );

      if (
        updateSize.every(
          (s) =>
            s["size"] !== null && s["quantity"] !== null && s["quantity"] > 0
        )
      ) {
        setStockError(false);
      }

      return updateSize;
    });

    setIsStockOpen(false);
  };

  const handleQty = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    setStokes((pre) =>
      pre.map((s, i) => (i === indexNum ? { ...s, quantity: quantity } : s))
    );

    if (
      stokes.every(
        (s) => s["size"] !== null && s["quantity"] !== null && s["quantity"] > 0
      )
    ) {
      setStockError(false);
    }
  };

  const deleteStock = () => {
    setStokes((pre) => pre.filter((s, i) => i !== indexNum));
  };
  return (
    <StockContainer>
      <div>
        <StockSelect
          list={StockList}
          handleSelect={handleStock}
          isSelectOpen={isStockOpen}
          setSelectOpen={setIsStockOpen}
          defaultOption={stock.size || "size"}
          stokes={stokes}
        />
      </div>
      <InputDiv>
        <input
          type="number"
          placeholder="Number of Stock"
          defaultValue={qty}
          onChange={handleQty}
        />
      </InputDiv>
      <DelectStock onClick={deleteStock}>
        <IconButton aria-label="delete" disabled color="primary">
          <DeleteIcon />
        </IconButton>
      </DelectStock>
    </StockContainer>
  );
};

export default Stock;
export const StockContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 70% 5%;
  gap: 10px;
`;

export const InputDiv = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;

  &:focus-within {
    border: 2px solid ${colors.inputFocus};
  }

  & > input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    color: ${colors.black_200};

    outline: none;
    border: none;
    background-color: transparent;
  }

  & > input::placeholder {
    color: ${colors.gray_300};
  }
`;
export const DelectStock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
