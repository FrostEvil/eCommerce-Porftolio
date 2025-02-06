import { JWTPayload } from "jose";

export default function NavLink(verifyUser: JWTPayload | undefined) {
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
