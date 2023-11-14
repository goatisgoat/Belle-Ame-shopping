import { Focused } from "react-credit-cards";
import { Product } from "./product.type";
import { Userstate } from "./user.type";

export type CardValue = {
  cvc: string;
  expiry: string;
  focus: Focused;
  name: string;
  number: string;
};
export type CardValueError = {
  cvc: boolean;
  expiry: boolean;
  focus: boolean;
  name: boolean;
  number: boolean;
};

export type ShipInfo = {
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  city: string;
  zip: string;
};

export type ShipInfoError = {
  firstName: boolean;
  lastName: boolean;
  contact: boolean;
  address: boolean;
  city: boolean;
  zip: boolean;
};

export type Order = {
  totalPrice: string | number;
  shipTo: {
    address: string;
    city: string;
    zip: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    contact: number;
  };
  items: {
    productId: Product;
    qty: number;
    size: string;
    price: number;
    _id: string;
  }[];
  orderNum: string;
  status: string;
  userId: Userstate;
  _id: string;
  createdAt: string;
};

export type CreateOrder = {
  totalPrice: string | number;
  shipTo: {
    address: string;
    city: string;
    zip: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    contact: number;
  };
  orderList:
    | {
        productId: string;
        qty: number;
        size: string;
      }[]
    | undefined;
};
