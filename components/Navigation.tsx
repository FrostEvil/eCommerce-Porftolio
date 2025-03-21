import Link from "next/link";
import NavLink from "./Nav-Link";
import { verifySession } from "@/lib/session";
import { logout } from "@/actions/auth-actions";
import NavLinks from "@/utils/links";

export default async function Navigation() {
  const verifyUser = await verifySession();
  const navLinks = NavLinks(verifyUser);

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
          <ul className="flex gap-x-10 uppercase text-lg font-medium">
            {navLinks &&
              navLinks.map((link) => {
                return <NavLink key={link.href} {...link} />;
              })}
            {verifyUser ? (
              <>
                <form action={logout}>
                  <button className="hover:text-blue-700 uppercase text-lg font-medium">
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <NavLink href="/account?mode=login" text="Log in" />
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
