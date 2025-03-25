"use client";

import { LinksType } from "@/types/type";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = LinksType & {
  session: Session | null;
};

export default function NavLink({ href, text, publicPage, session }: NavLink) {
  const pathname = usePathname();

  if (publicPage) {
    return (
      <li>
        <Link
          className={` hover:text-blue-700 duration-200 ${
            pathname === href.split("?")[0] ? "text-blue-700" : "text-gray-800"
          }`}
          href={href}
        >
          {text}
        </Link>
      </li>
    );
  }
  if (!!session?.user) {
    return (
      <li>
        <Link
          className={`hover:text-blue-700 duration-200 ${
            pathname === href.split("?")[0] ? "text-blue-700" : "text-gray-800"
          }`}
          href={href}
        >
          {text}
        </Link>
      </li>
    );
  }
  return;
}
