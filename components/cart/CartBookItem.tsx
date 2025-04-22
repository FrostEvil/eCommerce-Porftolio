import Image from "next/image";
import { CartBook } from "@/types/type";
import CartBookItemControls from "./CartBookItemControls";

export default async function CartBookItem({
  cartBook,
}: {
  cartBook: CartBook;
}) {
  return (
    <div className=" flex w-full py-6 px-2  max-w-[92%] mx-auto border-b border-gray-300  sm:gap-6">
      <div className="flex flex-col sm:flex-row sm:gap-6 flex-1">
        <div className="relative aspect-[2/3] w-1/3 sm:w-1/5 sm:min-w-[128px]  ">
          <Image
            src={cartBook.coverImageUrl}
            alt={`Cover of ${cartBook.title}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-4 sm:mt-0 sm:flex-1 space-y-1">
          <p className="text-base lg:text-lg font-semibold text-gray-800 ">
            {cartBook.title}
          </p>
          <p className="text-sm lg:text-base font-semibold text-gray-800">
            {cartBook.author}
          </p>
          <p className="text-xs lg:text-sm text-gray-600">{cartBook.genre}</p>
        </div>
      </div>

      <div>
        <CartBookItemControls
          userId={cartBook.userId}
          bookId={cartBook.bookId}
          amount={cartBook.amount}
          price={cartBook.price}
        />
      </div>
    </div>
  );
}

// import Image from "next/image";
// import { CartBook } from "@/types/type";
// import CartBookItemControls from "./CartBookItemControls";

// export default async function CartBookItem({
//   cartBook,
// }: {
//   cartBook: CartBook;
// }) {
//   return (
//     <div className=" flex w-full py-6 px-2  max-w-[92%] mx-auto border-b border-gray-300 flex-col sm:flex-row sm:gap-6">
//       <div className="relative aspect-[2/3] w-1/3 sm:w-1/5 sm:min-w-[64px] ">
//         <Image
//           src={cartBook.coverImageUrl}
//           alt={`Cover of ${cartBook.title}`}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="mt-4 sm:mt-0 sm:flex-1 space-y-1">
//         <p className="text-base lg:text-lg font-semibold text-gray-800 ">
//           {cartBook.title}
//         </p>
//         <p className="text-sm lg:text-base font-semibold text-gray-800">
//           {cartBook.author}
//         </p>
//         <p className="text-xs lg:text-sm text-gray-600">{cartBook.genre}</p>
//       </div>

//       <div>
//         <CartBookItemControls
//           userId={cartBook.userId}
//           bookId={cartBook.bookId}
//           amount={cartBook.amount}
//           price={cartBook.price}
//         />
//       </div>
//     </div>
//   );
// }
