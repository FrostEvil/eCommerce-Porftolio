"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { buildFilterQueryRoute } from "@/utils/buildFilterQuery";
import PriceRangeSelector from "./PriceRangeSelector";
import RatingCheckboxGroup from "./RatingCheckboxGroup";
import GenreSelect from "./GenreSelect";
import FilterButtons from "./FilterButtons";
import { BookGenre } from "@/types/type";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 299;
const MIN_RANGE_VALUE = 10;

type BookFilterPanelProps = {
  queryMinPrice?: number;
  queryMaxPrice?: number;
  queryGenre?: BookGenre | "";
  queryCheckedRatings?: number[];
};

export default function BookFilterPanel({
  queryMinPrice,
  queryMaxPrice,
  queryGenre,
  queryCheckedRatings,
}: BookFilterPanelProps) {
  const [minPrice, setMinPrice] = useState(queryMinPrice ?? DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice ?? DEFAULT_MAX_PRICE);
  const [genre, setGenre] = useState<BookGenre | "">(queryGenre ?? "");
  const [checkedRatings, setCheckedRatings] = useState<number[]>(
    queryCheckedRatings ?? []
  );
  const router = useRouter();

  const handleSubmitFilterOptions = () => {
    const queryUrl = buildFilterQueryRoute({
      minPrice,
      maxPrice,
      genre,
      rating: checkedRatings,
    });
    router.push(queryUrl);
  };

  const handleClearFilterOptions = () => {
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setGenre("");
    setCheckedRatings([]);

    router.push("/books?page=1");
  };

  return (
    <div className=" mb-12 py-8 px-4 flex flex-col gap-y-8 bg-white h-fit shadow-md">
      <PriceRangeSelector
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        defaultMinPrice={DEFAULT_MIN_PRICE}
        defaultMaxPrice={DEFAULT_MAX_PRICE}
        minRangeValue={MIN_RANGE_VALUE}
      />
      <RatingCheckboxGroup
        checkedRatings={checkedRatings}
        setCheckedRatings={setCheckedRatings}
      />
      <GenreSelect genre={genre} setGenre={setGenre} />
      <FilterButtons
        submitFilterOptions={handleSubmitFilterOptions}
        clearFilterOptions={handleClearFilterOptions}
      />
    </div>
  );
}
