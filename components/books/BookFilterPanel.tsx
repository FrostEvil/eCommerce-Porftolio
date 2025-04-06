"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { FilterRatingValues } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genresArr } from "@/utils/static-db";
import { Checkbox } from "../ui/checkbox";
import RatingValue from "../RatingValue";

const DEFAULT_MIN_PRICE = "0";
const DEFAULT_MAX_PRICE = "299";

const ratingValues: FilterRatingValues[] = [
  {
    starsAmount: 1,
    label: "1 star",
    checked: false,
    range: { from: 0, to: 1.5 },
  },
  {
    starsAmount: 2,
    label: "2 stars",
    checked: false,
    range: { from: 1.5, to: 2.5 },
  },
  {
    starsAmount: 3,
    label: "3 stars",
    checked: false,
    range: { from: 2.5, to: 3.5 },
  },
  {
    starsAmount: 4,
    label: "4 stars",
    checked: false,
    range: { from: 3.5, to: 4.5 },
  },
  {
    starsAmount: 5,
    label: "5 stars",
    checked: false,
    range: { from: 4.5, to: 5 },
  },
];

export default function BookFilterPanel() {
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [genre, setGenre] = useState("");
  const [bookRatingChecked, setBookRatingChecked] = useState(ratingValues);

  useEffect(() => {
    console.log("checked:", bookRatingChecked);
  }, [bookRatingChecked]);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <h2>Price:</h2>
        <Slider
          onValueChange={(e) => {
            setMinPrice(e[0].toString());
            setMaxPrice(e[1].toString());
          }}
          defaultValue={[Number(DEFAULT_MIN_PRICE), Number(DEFAULT_MAX_PRICE)]}
          max={Number(DEFAULT_MAX_PRICE)}
          min={Number(DEFAULT_MIN_PRICE)}
          step={1}
          minStepsBetweenThumbs={20}
        />
        <div className="flex justify-between gap-x-12">
          <Input
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
            className="border-gray-300 cursor-not-allowed px-4 py-2 rounded-lg w-24 text-center"
          />
          <Input
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border-gray-300 cursor-not-allowed px-4 py-2 rounded-lg w-24 text-center"
            value={maxPrice}
          />
        </div>
      </div>
      <div>
        <h2>Book Rating:</h2>
        <div className="mt-2 items-top flex flex-col space-y-3">
          {ratingValues.map((ratings) => {
            return (
              <div
                className="flex gap-x-2 leading-none"
                key={ratings.starsAmount}
              >
                <Checkbox
                  onCheckedChange={() =>
                    setBookRatingChecked((prev) =>
                      prev.map((pr) =>
                        pr.starsAmount === ratings.starsAmount
                          ? { ...pr, checked: !pr.checked }
                          : { ...pr }
                      )
                    )
                  }
                />
                <label className="flex gap-x-2 items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <RatingValue value={ratings.starsAmount} />
                  <p className="text-gray-800">{ratings.label}</p>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>Genre:</h2>
        <div className="mt-2">
          <Select onValueChange={(e) => setGenre(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genresArr.map((genre) => {
                return (
                  <SelectItem
                    className="text-xs"
                    key={genre.name}
                    value={genre.name}
                  >
                    {genre.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
