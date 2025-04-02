import { auth } from "@/lib/auth";
import NavBarMenu from "./NavBarMenu";

export default async function Navigation() {
  const session = await auth();

  return (
    <header
      className="bg-gradient-to-r from-blue-200 via-blue-50 to-blue-300
 w-full h-10 md:h-12 flex justify-center"
    >
      <nav className="w-full md:container mx-auto">
        <div className="relative h-full flex justify-center md:justify-between  items-center">
          <NavBarMenu session={session} />
        </div>
      </nav>
    </header>
  );
}
