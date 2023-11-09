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

export type TableColumn = {
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
