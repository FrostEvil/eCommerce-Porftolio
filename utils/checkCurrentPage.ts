import { Book } from "@/types/type";

export function checkCurrentPage(id: Book["id"]) {
  const take: number = Number(process.env.BOOKS_PER_PAGE);
  const currentPage = Math.ceil(id / take);
  return currentPage;
}
