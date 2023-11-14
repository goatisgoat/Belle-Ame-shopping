import { ChangeEvent } from "react";
import { Errors } from "./error.types";

export type Stoke = {
  size: string | null;
  quantity: number | null;
};

export type InitialNewProduct = {
  name: string;
  sku: string;
  stock: { [key: string]: string };
  image: string;
  description: string;
  category: string[];
  status: string;
  price: number;
};

export type Product = {
  name: string;
  sku: string;
  stock: {
    [key: string]: string;
  };
  image: string;
  description: string;
  category: string[];
  status: string;
  price: number;
  _id: string;
  isDeleted: boolean;
};

export type productTableColumn = {
  id:
    | "sku"
    | "name"
    | "price"
    | "stock"
    | "image"
    | "status"
    | "num"
    | "deleteEdit";
  label: string;
  minWidth?: number;
  align?: "center";
};

export type orderTableColumn = {
  id:
    | "num"
    | "orderNum"
    | "user"
    | "orderItem"
    | "address"
    | "totalPrice"
    | "status";
  label: string;
  minWidth?: number;
  align?: "center";
};

export type ModalProductProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Errors;
  updateError: (field: string, value: boolean) => void;
  stokes: Stoke[];
  setStokes: React.Dispatch<React.SetStateAction<Stoke[]>>;
  handelAddStock: () => void;
  handleImg: (url: string) => void;
  handleCategory: (e: React.MouseEvent<HTMLElement>) => void;
  setIsCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryOpen: boolean;
  handleStatus: (e: React.MouseEvent<HTMLElement>) => void;
  isStatusOpen: boolean;
  setIsStatusOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newProduct: InitialNewProduct;
  handleNewProduct: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreate: any;
  mode: string;
};
