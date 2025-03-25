import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function AccountLinks({
  setShowLinks,
}: {
  setShowLinks: Dispatch<SetStateAction<boolean>>;
}) {
  const handleShowLinks = () => {
    setShowLinks(false);
  };
  return (
    <div className="absolute z-30 bg-gradient-to-r from-blue-200 via-blue-50 to-blue-300 shadow-lg top-0 right-0 w-56 border border-blue-300 animate-fadeIn">
      <div className="flex flex-col gap-3 p-4">
        <Link
          href="/sign-in"
          className="text-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all w-full text-center py-2 rounded-lg shadow-md "
          onClick={handleShowLinks}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="text-md font-medium text-blue-700 hover:text-white border-2 border-blue-600 hover:bg-blue-600 transition-all w-full text-center py-2 rounded-lg shadow-md "
          onClick={handleShowLinks}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
