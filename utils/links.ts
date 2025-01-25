import { verifySession } from "@/lib/session";
import { LinksType } from "@/types/type";

export default async function NavLinks(): Promise<LinksType[]> {
  const verifyUser = await verifySession();

  if (verifyUser) {
    return [
      {
        href: "/",
        text: "Home",
      },
      {
        href: "/products?page=1",
        text: "Products",
      },
      {
        href: "/cart",
        text: "Cart",
      },
    ];
  }

  return [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/products?page=1",
      text: "Products",
    },
  ];
}
