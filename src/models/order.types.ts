import { Focused } from "react-credit-cards";

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
