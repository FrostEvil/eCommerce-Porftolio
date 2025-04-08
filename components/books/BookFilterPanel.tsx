"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { buildFilterQuery } from "@/utils/buildFilterQuery";
import PriceRangeSelector from "./PriceRangeSelector";
import RatingCheckboxGroup from "./RatingCheckboxGroup";
import GenreSelect from "./GenreSelect";
import FilterButtons from "./FilterButtons";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 299;
const MIN_RANGE_VALUE = 10;

export default function BookFilterPanel() {
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [genre, setGenre] = useState("");
  const [checkedRatings, setCheckedRatings] = useState<number[]>([]);
  const router = useRouter();

  const handleSubmitFilterOptions = () => {
    const queryUrl = buildFilterQuery({
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
    <div className="py-8 px-4 flex flex-col gap-y-8 bg-white h-fit shadow-md">
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
