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
  const [showLinks, setShowLinks] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const activeLinks = ["/sign-in", "/sign-up"];
  const isActive = activeLinks.includes(pathname);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowLinks(false);
      }
    };
    if (showLinks) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinks]);
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

      {showLinks && (
        <div className="relative">
          {session?.user ? (
            <AccountManagement setShowLinks={setShowLinks} />
          ) : (
            <AccountLinks setShowLinks={setShowLinks} />
          )}
        </div>
      )}
    </div>
  );
}
