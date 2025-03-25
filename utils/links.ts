import { LinksType } from "@/types/type";

export default function NavLinks(): LinksType[] {
  return [
    {
      href: "/",
      text: "Home",
      publicPage: true,
    },
    {
      href: "/products?page=1",
      text: "Products",
      publicPage: false,
    },
  ];
}
