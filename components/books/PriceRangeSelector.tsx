import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

type PriceRangeSelectorProps = {
  minPrice: number;
  maxPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  defaultMinPrice: number;
  defaultMaxPrice: number;
  minRangeValue: number;
};

export default function PriceRangeSelector({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  defaultMinPrice,
  defaultMaxPrice,
  minRangeValue,
}: PriceRangeSelectorProps) {
  return (
    <div className="basis-full sm:basis-1/4 flex flex-col gap-y-4">
      <h2 className="text-sm md:text-base font-semibold text-gray-700">
        Price:
      </h2>
      <label htmlFor="price-slider" className="sr-only">
        Price range
      </label>
      <Slider
        id="price-slider"
        value={[minPrice, maxPrice]}
        onValueChange={(e) => {
          setMinPrice(e[0]);
          setMaxPrice(e[1]);
        }}
        defaultValue={[defaultMinPrice, defaultMaxPrice]}
        max={defaultMaxPrice}
        min={defaultMinPrice}
        step={1}
        minStepsBetweenThumbs={50}
      />
      <div className="flex justify-between">
        <label htmlFor="minPrice-input" className="sr-only">
          Minimal price
        </label>
        <Input
          id="minPrice-input"
          onChange={(e) => setMinPrice(Number(e.target.value))}
          onBlur={() => {
            if (minPrice >= maxPrice) {
              setMinPrice(maxPrice - minRangeValue);
            } else if (minPrice < defaultMinPrice) {
              setMinPrice(defaultMinPrice);
            }
          }}
          value={minPrice}
          className="border-gray-300 text-sm md:text-base cursor-not-allowed px-4 py-2 rounded-lg w-16 lg:w-20 xl:w-24 text-center"
        />
        <label htmlFor="maxPrice-input" className="sr-only">
          Maximal price
        </label>
        <Input
          id="maxPrice-input"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          onBlur={() => {
            if (maxPrice <= minPrice) {
              setMaxPrice(minPrice + minRangeValue);
            } else if (maxPrice > defaultMaxPrice) {
              setMaxPrice(defaultMaxPrice);
            }
          }}
          className="border-gray-300 text-sm md:text-base  cursor-not-allowed px-4 py-2 rounded-lg w-16 lg:w-20 xl:w-24 text-center"
          value={maxPrice}
        />
      </div>
    </div>
  );
}
