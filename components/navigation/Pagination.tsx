import { cn } from "@/lib/utils";
import { PaginationProps } from "@/types/type";
import getPagesToShow from "@/utils/paginationPagesToShow";
import Link from "next/link";

export default function Pagination({ ...paginationProps }: PaginationProps) {
  const { pageNumber, totalPages, hasNextPage, queryRoute } = paginationProps;
  const currentPage = Math.min(Math.max(Number(pageNumber), 1), totalPages);

  const pages = getPagesToShow({ currentPage, totalPages });
  return (
    <div className="my-10 flex items-center justify-center space-x-4 md:space-x-6 text-black">
      <Link
        className={cn(
          "rounded-md border border-gray-300 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium hover:bg-blue-300 duration-200",
          currentPage === 1 ? "pointer-events-none bg-gray-300" : "bg-blue-200"
        )}
        href={`/books?page=${currentPage - 1}${queryRoute}`}
      >
        Previous
      </Link>

      <nav
        aria-label="Pagination"
        className="relative z-0 inline-flex -space-x-px rounded-md"
      >
        {pages.map((p, i) => (
          <Link
            key={p}
            className={cn(
              "relative inline-flex items-center border border-gray-300 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm  font-medium hover:bg-blue-300 duration-200",
              p === currentPage
                ? "pointer-events-none bg-blue-300"
                : "bg-blue-200",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : ""
            )}
            href={`/books?page=${p}${queryRoute}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Link
        className={cn(
          "rounded-md border border-gray-300 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm  font-medium hover:bg-blue-300 duration-200",
          !hasNextPage ? "pointer-events-none bg-gray-300" : "bg-blue-200"
        )}
        href={`/books?page=${currentPage + 1}${queryRoute}`}
      >
        Next
      </Link>
    </div>
  );
}
