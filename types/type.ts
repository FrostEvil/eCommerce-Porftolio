export type LinksType = {
  href: string;
  text: string;
};

export type User = {
  id?: string;
  email: string;
  password: string;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  language: string;
  yearPublished: number;
  rating: number;
  stockQuantity: number;
  coverImageUrl: string;
  description: string;
};

export type CartBook = {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  stockQuantity: number;
  coverImageUrl: string;
  quantity: number;
  endingPrice: number;
};
