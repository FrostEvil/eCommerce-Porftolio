import { Book } from "@/types/type";

export function checkCurrentPage(id: Book["id"]) {
  const take: number = Number(process.env.PAGE_SIZE);
  const currentPage = Math.ceil(id / take);
  return currentPage;
}
