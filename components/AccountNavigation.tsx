"use client";

import { useEffect, useRef, useState } from "react";
import AccountLinks from "./AccountLinks";
import { usePathname } from "next/navigation";
import AccountManagement from "./AccountManagement";
import { Session } from "next-auth";

export default function AccountNavgation({
  session,
}: {
  session: Session | null;
}) {
  const [showAccountNav, setShowAccountNav] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const accountNavigationLinks = ["/sign-in", "/sign-up"];
  const isActive = accountNavigationLinks.includes(pathname);

  const handleShowLinks = () => {
    setShowAccountNav(!showAccountNav);
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowAccountNav(false);
      }
    };
    if (showAccountNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountNav]);

  return (
    <div ref={wrapperRef}>
      <button
        className={`uppercase h-12 hover:text-blue-700 duration-200 ${
          isActive ? "text-blue-700" : "text-gray-800"
        }`}
        onClick={handleShowLinks}
      >
        My account
      </button>

      {showAccountNav && (
        <div className="relative">
          {session?.user ? (
            <AccountManagement setShowAccountNav={setShowAccountNav} />
          ) : (
            <AccountLinks setShowAccountNav={setShowAccountNav} />
          )}
        </div>
      )}
    </div>
  );
}
