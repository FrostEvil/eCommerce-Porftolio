import { Dispatch, SetStateAction } from "react";
import RatingValue from "../RatingValue";
import { Checkbox } from "../ui/checkbox";

type FilterRatingValues = {
  starsAmount: number;
  label: string;
};

type RatingCheckboxGroupType = {
  checkedRatings: number[];
  setCheckedRatings: Dispatch<SetStateAction<number[]>>;
};

const ratingValues: FilterRatingValues[] = [
  {
    starsAmount: 1,
    label: "1 star",
  },
  {
    starsAmount: 2,
    label: "2 stars",
  },
  {
    starsAmount: 3,
    label: "3 stars",
  },
  {
    starsAmount: 4,
    label: "4 stars",
  },
  {
    starsAmount: 5,
    label: "5 stars",
  },
];

export default function RatingCheckboxGroup({
  checkedRatings,
  setCheckedRatings,
}: RatingCheckboxGroupType) {
  const handleCheckedRatings = (starRating: number) => {
    setCheckedRatings((prev) => {
      if (prev.some((pr) => pr === starRating)) {
        return prev.filter((pr) => pr !== starRating);
      } else {
        return [...prev, starRating];
      }
    });
  };

  const isRatingChecked = (starRating: number): boolean => {
    if (checkedRatings.some((rating) => rating === starRating)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="basis-full sm:basis-1/4">
      <h2 className="text-sm md:text-base font-semibold text-gray-700">
        Book Rating:
      </h2>
      <div className="mt-2 items-top flex flex-col space-y-3">
        {ratingValues.map((ratings) => {
          return (
            <div
              className="flex gap-x-1 md:gap-x-2 leading-none"
              key={ratings.starsAmount}
            >
              <label
                htmlFor={`${ratings.starsAmount}-rating-checkbox`}
                className="sr-only"
              >
                {ratings.starsAmount} rating checkbox
              </label>
              <Checkbox
                checked={isRatingChecked(ratings.starsAmount)}
                id={`${ratings.starsAmount}-rating-checkbox`}
                onCheckedChange={() =>
                  handleCheckedRatings(ratings.starsAmount)
                }
              />
              <label className="flex gap-x-2 items-center text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <RatingValue value={ratings.starsAmount} />
                <p className="hidden lg:block text-gray-800">{ratings.label}</p>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
