import { oAuthProviderEnum, userRoleEnum } from "@/drizzle/schema";
import { User } from "next-auth";

export type LinksType = {
  href: string;
  text: string;
  publicPage: boolean;
};

export type BookGenre =
  | "Fiction"
  | "Sci-Fi"
  | "Fantasy"
  | "Classic"
  | "Romance"
  | "Historical Fiction"
  | "Horror"
  | "Adventure"
  | "Magical Realism"
  | "Dystopian";

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: BookGenre;
  price: number;
  language: string;
  yearPublished: number;
  rating: number;
  coverImageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartBook = {
  id: number;
  userId: User["id"];
  bookId: Book["id"];
  title: string;
  author: string;
  genre: BookGenre;
  price: number;
  language: string;
  yearPublished: number;
  rating: number;
  coverImageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
};

export type FormErrors = {
  nameError?: string[];
  emailError?: string[];
  passwordError?: string[];
  globalError?: string[];
};

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export type ProviderType = (typeof oAuthProviderEnum.enumValues)[number];

export type PaginationProps = {
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  queryRoute: string;
};

export type FiltersProps = {
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  genre?: BookGenre | "";
  rating?: number[];
};
