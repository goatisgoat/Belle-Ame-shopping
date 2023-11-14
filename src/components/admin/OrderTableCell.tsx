import { orderTableColumn } from "../../models/product.type";
import Button from "../common/Button";
import { Order } from "../../models/order.types";
import { colors } from "../../style/theme/colors";

type Props = {
  row: Order;
  column: orderTableColumn;
  length: number;
  page: number;
};

const OrderTableCell = ({ row, column, length, page }: Props) => {
  if (column.id === "num") {
    const plusLen = length + 1;
    const TOTAL_PAGE = 3;
    const currentStartNum = (page - 1) * TOTAL_PAGE;
    return <div>{page === 1 ? plusLen : plusLen + currentStartNum}</div>;
  }

  if (column.id === "orderNum") {
    return <div>{row.orderNum}</div>;
  }

  if (column.id === "user") {
    return <div>{row.userId.email}</div>;
  }

  if (column.id === "orderItem") {
    if (row.items.length > 1)
      return (
        <div>
          {row.items[0].productId.name} 외 {row.items.length} 건
        </div>
      );
    return <div>{row.items[0].productId.name}</div>;
  }

  if (column.id === "address") {
    return <div>{row.shipTo.address}</div>;
  }

  if (column.id === "totalPrice") {
    return <div>₩ {row.totalPrice.toLocaleString()}</div>;
  }

  if (column.id === "status") {
    type ColorKey = keyof typeof colors;
    const statusKey = row.status as ColorKey;

    return (
      <Button
        paddingSide="15"
        borderRadius="20"
        background={colors[statusKey]}
        Fontcolor="#5c4e46"
      >
        {row.status}
      </Button>
    );
  }

  return <div>{row[column.id]}</div>;
};

export default OrderTableCell;
