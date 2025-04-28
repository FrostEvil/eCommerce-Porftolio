"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

type CheckboxWithTextProps = {
  isOnSaleChecked: boolean;
  setIsOnSaleChecked: Dispatch<SetStateAction<boolean>>;
};

export function CheckboxWithText({
  isOnSaleChecked,
  setIsOnSaleChecked,
}: CheckboxWithTextProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox
        id="terms1"
        checked={isOnSaleChecked}
        onCheckedChange={(e: boolean) => setIsOnSaleChecked(e)}
      />
      <label
        htmlFor="terms1"
        className="text-sm md:text-base font-semibold text-gray-700"
      >
        On Sale
      </label>
    </div>
  );
}
