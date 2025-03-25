//Do I actually needed??

// "use server";

// import { getSelectedBooks, getTotalBooksCount } from "@/lib/books";

// type FetchSelectedBooksProps = {
//   take: number;
//   skip: number;
// };

// export async function fetchSelectedBooks({
//   take,
//   skip,
// }: FetchSelectedBooksProps) {
//   const selectedBooks = getSelectedBooks({ take, skip });
//   const totalBooks = getTotalBooksCount();

//   return {
//     books: selectedBooks,
//     metadata: {
//       hasNextPage: skip + take < totalBooks,
//       totalPage: Math.ceil(totalBooks / take),
//     },
//   };
// }
