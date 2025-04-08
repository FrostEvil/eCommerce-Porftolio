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
  | "Mystery"
  | "Non-Fiction"
  | "Fantasy"
  | "Romance"
  | "Classic"
  | "Historical Fiction"
  | "Horror"
  | "Adventure"
  | "Magical Realism"
  | "Dystopian"
  | "Modernist"
  | "Philosophical Fiction"
  | "Post-Apocalyptic Fiction";

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
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type FiltersProps = {
  minPrice: number;
  maxPrice: number;
  genre: string;
  rating: number[];
};
