"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const sortingPanelContent = [
  {
    label: " Featured",
    query: undefined,
  },
  {
    label: " Price: High to Low",
    query: "price-desc",
  },
  {
    label: " Price: Low to High",
    query: "price-asc",
  },
  {
    label: " Rating: High to Low",
    query: "rating-desc",
  },
  {
    label: " Rating: Low to High",
    query: "rating-asc",
  },
];

export default function BookSortingPanel({
  sort,
}: {
  sort: string | undefined;
}) {
  const [sortingContentValue, setSortingContentValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const defaultSortingContentValue = sortingPanelContent.find(
      (value) => value.query === sort || undefined
    );

    if (defaultSortingContentValue)
      setSortingContentValue(defaultSortingContentValue?.label);
  });

  const handleSelectSortingMethod = (e: string) => {
    setSortingContentValue(e);

    const currentParams = new URLSearchParams(searchParams.toString());

    const query = sortingPanelContent.find((value) => value.label === e)?.query;

    if (query) {
      currentParams.set("sort", query);
    } else {
      currentParams.delete("sort");
    }
    router.push(`/books?${currentParams}`);
  };
  return (
    <div className="flex justify-center md:justify-end">
      <div className="w-3/5 md:w-[260px] lg:w-[274px]">
        <Select
          value={sortingContentValue}
          onValueChange={handleSelectSortingMethod}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by: Featured" />
          </SelectTrigger>
          <SelectContent>
            {sortingPanelContent.map((sorting) => {
              return (
                <SelectItem key={sorting.label} value={sorting.label}>
                  {sorting.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
