"use client";

import { Rating } from "react-simple-star-rating";

export default function RatingValue({ value }: { value: number }) {
  return (
    <Rating
      SVGstyle={{ display: "inline-block" }}
      initialValue={value}
      size={20}
      readonly
      allowFraction
    />
  );
}
