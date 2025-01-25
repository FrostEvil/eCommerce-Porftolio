"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function AddToCartButton({
  verifyUser,
}: {
  verifyUser: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleOnMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleOnMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  return (
    <>
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="relative group"
      >
        <button
          disabled={!verifyUser}
          className={`bg-green-500 text-white text-sm font-semibold py-1.5 px-4 rounded  transition duration-300 ${
            verifyUser ? "hover:bg-green-600" : ""
          }`}
        >
          Add to Cart
        </button>
        {!verifyUser && (
          <div
            className={`absolute w-32 transform top-8  bg-white text-black text-xs py-1 px-3 shadow-lg  transition-all duration-300 z-10 ${
              isHovered
                ? "group-hover:opacity-100 group-hover_pointer-events-auto"
                : "opacity-0 pointer-events-none "
            }`}
          >
            Please
            <Link
              className="text-blue-500 hover:text-blue-600 duration-300 underline"
              href="/account?mode=login"
            >
              &nbsp;log in&nbsp;
            </Link>
            to add items to your cart.
          </div>
        )}
      </div>
    </>
  );
}
