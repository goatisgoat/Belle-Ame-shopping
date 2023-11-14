import {
  InitialNewProduct,
  orderTableColumn,
  productTableColumn,
} from "../models/product.type";

export const Category = ["top", "dress", "skirt", "shirt", "jacket", "coat"];
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
  { id: "sku", label: "Sku", minWidth: 120 },
  { id: "name", label: "name", minWidth: 120 },
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
  { id: "orderNum", label: "Order Num", minWidth: 120 },
  { id: "orderItem", label: "Order Item", minWidth: 120 },
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
