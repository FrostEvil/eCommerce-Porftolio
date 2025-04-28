"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildFilterQueryRoute } from "@/utils/buildFilterQuery";
import PriceRangeSelector from "./PriceRangeSelector";
import RatingCheckboxGroup from "./RatingCheckboxGroup";
import GenreSelect from "./GenreSelect";
import FilterButtons from "./FilterButtons";
import { BookGenre } from "@/types/type";
import { CheckboxWithText } from "./CheckboxWithText";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 299;
const MIN_RANGE_VALUE = 10;

type BookFilterPanelProps = {
  queryMinPrice?: number;
  queryMaxPrice?: number;
  queryGenre?: BookGenre | "";
  queryCheckedRatings?: number[];
  sort?: string;
  onSale?: boolean;
};

export default function BookFilterPanel({
  queryMinPrice,
  queryMaxPrice,
  queryGenre,
  queryCheckedRatings,
  sort,
  onSale,
}: BookFilterPanelProps) {
  const [minPrice, setMinPrice] = useState(queryMinPrice ?? DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice ?? DEFAULT_MAX_PRICE);
  const [genre, setGenre] = useState<BookGenre | "">(queryGenre ?? "");
  const [checkedRatings, setCheckedRatings] = useState<number[]>(
    queryCheckedRatings ?? []
  );
  const [isOnSaleChecked, setIsOnSaleChecked] = useState<boolean>(
    onSale ? onSale : false
  );
  const router = useRouter();

  const handleSubmitFilterOptions = () => {
    const queryUrl = buildFilterQueryRoute({
      minPrice,
      maxPrice,
      genre,
      rating: checkedRatings,
      sort,
      onSale: isOnSaleChecked,
    });
    router.push(queryUrl);
  };

  const handleClearFilterOptions = () => {
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setGenre("");
    setCheckedRatings([]);
    setIsOnSaleChecked(false);
    if (sort) {
      router.push(`/books?page=1&sort=${sort}`);
    } else {
      router.push("books/?page=1");
    }
  };

  return (
    <div className="w-3/5 sm:w-full md:w-full mb-12  py-4 md:py-8 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row md:flex-col gap-x-4 md:gap-x-0 gap-y-8 bg-white h-fit shadow-md">
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
      <CheckboxWithText
        isOnSaleChecked={isOnSaleChecked}
        setIsOnSaleChecked={setIsOnSaleChecked}
      />
      <FilterButtons
        submitFilterOptions={handleSubmitFilterOptions}
        clearFilterOptions={handleClearFilterOptions}
      />
    </div>
  );
}
