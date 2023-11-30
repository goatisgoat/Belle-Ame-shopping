import { Product, productTableColumn } from "../../models/product.type";
import styled from "styled-components";
import { StockList } from "../../utility/utils";
import Button from "../common/Button";
import { colors } from "../../style/theme/colors";
import Text from "../common/Text";

type Props = {
  row: Product;
  column: productTableColumn;
  length: number;
  page: number;
  handleDeleteProduct: (row: Product) => void;
  handleEditProduct: (row: Product) => void;
};

const ProductTableCell = ({
  row,
  column,
  length,
  page,
  handleDeleteProduct,
  handleEditProduct,
}: Props) => {
  if (column.id === "num") {
    const plusLen = length + 1;
    const TOTAL_PAGE = 3;
    const currentStartNum = (page - 1) * TOTAL_PAGE;
    return <div>{page === 1 ? plusLen : plusLen + currentStartNum}</div>;
  }

  if (column.id === "name") {
    return <Text bold={800}>{row.name}</Text>;
  }

  if (column.id === "price") {
    return <div>₩ {row.price.toLocaleString()}</div>;
  }

  if (column.id === "stock") {
    const stock = row["stock"];

    const stockElements: React.ReactNode[] = [];

    StockList.forEach((size) => {
      stock[size] &&
        stockElements.push(
          <div key={size}>
            {size} : {stock[size]}
          </div>
        );
    });

    return <div>{stockElements}</div>;
  }

  if (column.id === "image") {
    return <TableImg src={row[column.id]} />;
  }

  if (column.id === "deleteEdit") {
    return (
      <TableDeleteEdit>
        <Button
          paddingTop="3"
          paddingSide="8"
          borderRadius="15"
          background={colors.adminDelete}
          Fontcolor={colors.white}
          onClick={() => handleDeleteProduct(row)}
        >
          delete
        </Button>
        <Button
          paddingTop="3"
          paddingSide="8"
          borderRadius="15"
          background={colors.preparing}
          Fontcolor={colors.white}
          onClick={() => handleEditProduct(row)}
        >
          edit
        </Button>
      </TableDeleteEdit>
    );
  }

  return <div>{row[column.id]}</div>;
};

export default ProductTableCell;

export const TableImg = styled.img`
  width: 120px;
  object-fit: cover;
`;

export const TableDeleteEdit = styled.div`
  & > button {
    margin-bottom: 3px;
  }
`;
