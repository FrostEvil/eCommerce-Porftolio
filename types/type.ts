import { oAuthProviderEnum, userRoleEnum } from "@/drizzle/schema";

export type LinksType = {
  href: string;
  text: string;
  publicPage: boolean;
};

export type User = {
  id: number;
  id: number;
  email: string;
  password: string;
};

export type SessionPayload = {
  userId: number;
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

export type FormErrors = {
  nameError?: string[];
  emailError?: string[];
  passwordError?: string[];
  globalError?: string[];
};

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export type ProviderType = (typeof oAuthProviderEnum.enumValues)[number];
