import { TableCell, makeStyles } from "@mui/material";
import {
  InitialNewProduct,
  orderTableColumn,
  productTableColumn,
} from "../models/product.type";
import { createTheme, styled } from "@mui/system";

export const Category = ["jacket", "t-shirt", "pant", "skirt", "derss", "etc"];
export const productStatus = ["active", "disactive"];
export const orderStatus = [
  "preparing",
  "panding",
  "shipped",
  "delivered",
  "refund",
];

export const productColumns: readonly productTableColumn[] = [
  { id: "num", label: "#", minWidth: 70 },
  { id: "sku", label: "Sku", minWidth: 120, align: "center" },
  { id: "name", label: "name", minWidth: 120, align: "center" },
  {
    id: "price",
    label: "price",
    minWidth: 120,
    align: "center",
  },
  {
    id: "stock",
    label: "stock",
    minWidth: 170,
    align: "center",
  },
  {
    id: "image",
    label: "image",
    minWidth: 120,
    align: "center",
  },
  {
    id: "status",
    label: "status",
    minWidth: 120,
    align: "center",
  },
  { id: "deleteEdit", label: "*", minWidth: 70, align: "center" },
];

export const orderColumns: readonly orderTableColumn[] = [
  { id: "num", label: "#", minWidth: 70 },
  { id: "orderNum", label: "Order Num", minWidth: 120, align: "center" },
  { id: "orderItem", label: "Order Item", minWidth: 120, align: "center" },
  {
    id: "user",
    label: "User",
    minWidth: 120,
    align: "center",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 120,
    align: "center",
  },
  {
    id: "totalPrice",
    label: "TotalPrice",
    minWidth: 170,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    align: "center",
  },
];

export const StockList = ["XS", "S", "M", "L", "XL"];

export const initialNewProduct: InitialNewProduct = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "",
  price: 0,
};

//error
export const initialErrors = {
  sku: false,
  name: false,
  description: false,
  stock: false,
  image: false,
  price: false,
  category: false,
  status: false,
};

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "RIDIBatang, Crimson Text, Noto Sans KR",
        },
      },
    },
  },
});

export const CustomFontTableCell = styled(TableCell)({
  fontFamily: "Roboto Condensed, Noto Sans KR",
  // 추가적인 스타일 속성들...
});
