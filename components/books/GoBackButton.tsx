"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-blue-500 hover:text-blue-700 underline text-sm"
    >
      &larr; Click here to go back
    </button>
  );
}
