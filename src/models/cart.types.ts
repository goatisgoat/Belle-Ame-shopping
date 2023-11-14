import { Product } from "./product.type";

export type Cart = {
  productId: Product;
  qty: number;
  size: string;
  _id: string;
};
