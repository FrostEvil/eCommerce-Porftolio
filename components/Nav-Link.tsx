"use client";

import { cn } from "@/lib/utils";
import { LinksType } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, text }: LinksType) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        className={cn(
          "hover:text-blue-700 duration-200",
          pathname === href.split("?")[0] ? "text-blue-700" : "text-gray-800"
        )}
        href={href}
      >
        {text}
      </Link>
    </li>
  );
}
