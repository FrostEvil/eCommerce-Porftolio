import { cn } from "@/lib/utils";
import { PaginationProps } from "@/types/type";
import getPagesToShow from "@/utils/paginationPagesToShow";
import Link from "next/link";

export default function Pagination({ ...paginationProps }: PaginationProps) {
  const { page, totalPages, hasNextPage } = paginationProps;
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const pages = getPagesToShow({ currentPage, totalPages });

  return (
    <div className="my-10 flex items-center justify-center space-x-6 text-black">
      <Link
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          currentPage === 1 ? "pointer-events-none bg-gray-100" : ""
        )}
        href={`/books?page=${currentPage - 1}`}
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
              "relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50",
              p === currentPage ? "pointer-events-none bg-gray-200" : "",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : ""
            )}
            href={`/books?page=${p}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Link
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          !hasNextPage ? "pointer-events-none bg-gray-100" : ""
        )}
        href={`/books?page=${currentPage + 1}`}
      >
        Next
      </Link>
    </div>
  );
}
