type User = {
  credit: number,
  id: number,
  lastchanged: number,
  name: string
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
