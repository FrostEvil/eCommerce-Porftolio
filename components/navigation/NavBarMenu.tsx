"use client";

import Link from "next/link";
import NavLink from "./Nav-Link";
import AccountNavgation from "../account/AccountNavigation";
import { Session } from "next-auth";
import { IoMdClose } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navigationLinks = [
  {
    href: "/",
    text: "Home",
    publicPage: true,
  },
  {
    href: "/books?page=1",
    text: "Books",
    publicPage: true,
  },
  {
    href: "/cart",
    text: "Cart",
    publicPage: false,
  },
];

export default function NavBarMenu({ session }: { session: Session | null }) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (isShow) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isShow]);

  const displayBurgerIcon = () => {
    if (isShow) {
      return (
        <button
          className="absolute right-2 top-1"
          onClick={() => setIsShow(false)}
        >
          <IoMdClose size={32} />
        </button>
      );
    }
    return (
      <button
        className="absolute right-2 top-2  md:hidden"
        onClick={() => setIsShow(true)}
      >
        <CiMenuFries size={32} />
      </button>
    );
  };
  return (
    <>
      <div
        className={cn(
          "absolute md:static md:flex justify-center md:justify-between items-center h-screen md:h-full w-full top-0 left-0 py-12 md:py-0  bg-white md:bg-inherit duration-300 md:translate-x-0",
          isShow ? "translate-x-0" : "translate-x-full hidden"
        )}
      >
        <div className="text-xl font-bold hidden md:block">
          <Link href="/">LitStore</Link>
        </div>
        <ul
          className={cn(
            "flex flex-col md:flex-row h-full md:gap-x-10  justify-evenly items-center text-2xl md:text-lg font-medium uppercase"
          )}
        >
          {navigationLinks.map((link) => {
            return <NavLink key={link.href} {...link} session={session} />;
          })}
          <li>
            <AccountNavgation session={session} />
          </li>
        </ul>
      </div>
      {displayBurgerIcon()}
    </>
  );
}
