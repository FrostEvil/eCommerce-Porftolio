import Link from "next/link";
import NavLink from "./Nav-Link";
import { auth } from "@/lib/auth";
import AccountNavgation from "./AccountNavigation";

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
];

export default async function Navigation() {
  const session = await auth();

  return (
    <header
      className="bg-gradient-to-r from-blue-200 via-blue-50 to-blue-300
 w-full h-12 flex justify-center"
    >
      <nav className="container mx-auto">
        <div className="h-full flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">LitStore</Link>
          </div>
          <ul className=" flex gap-x-10 uppercase items-center text-lg font-medium ">
            {navigationLinks.map((link) => {
              return <NavLink key={link.href} {...link} session={session} />;
            })}
            <li>
              <AccountNavgation session={session} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
