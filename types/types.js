import { type Node } from "react";

declare var VERSION: string;
declare var COMMITHASH: string;
declare var BRANCH: string;

type Classes = { classes: Object };
type Children = { children: Node };

type User = {
  credit: number,
  id: number,
  lastchanged: number,
  name: string,
  avatar: ?string
};

type AuthorizedUser = User & {
  pincode: ?string,
  token: ?string,
  email: ?string,
  debtAllowed: boolean,
  debtHardLimit: number
};

type Product = {
  id: number,
  name: string,
  price: number,
  category: string,
  ean: string,
  imagePath: string
};

type Transaction = {
  id: number,
  credit: number,
  delta: number,
  description: string,
  time: number,
  userId: string
};
