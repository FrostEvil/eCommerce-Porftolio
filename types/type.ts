export type LinksType = {
  href: string;
  text: string;
};

export type User = {
  id: number;
  email: string;
  password: string;
};

export type SessionPayload = {
  userId: number;
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
  userId: number;
  id: number;
  quantity: number;
  endingPrice: number;
};

export type UserSession = {
  userId: number;
  session: string;
};

export type ManageUserCartBook = {
  userId: number;
  book: Book;
};

export type UseCartManagementType = ManageUserCartBook & {
  cartBook: CartBook | undefined;
};

export type CartSummary = {
  totalPrice: number;
  totalQuantity: number;
};

export type CartSummaryProps = {
  cartItems: CartBook[];
};
