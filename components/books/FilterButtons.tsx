type FilterButtonsProps = {
  submitFilterOptions: () => void;
  clearFilterOptions: () => void;
};

export default function FilterButtons({
  submitFilterOptions,
  clearFilterOptions,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-col gap-y-8 basis-full sm:basis-1/4">
      <button
        className="py-2 text-sm md:text-base font-semibold bg-yellow-400 hover:bg-yellow-500 duration-200 transition-all text-gray-900 rounded-[3px]"
        type="button"
        onClick={submitFilterOptions}
      >
        Show results
      </button>
      <button
        onClick={clearFilterOptions}
        className=" py-2 bg-gray-400 hover:bg-gray-500 duration-200 transition-all text-sm md:text-base text-white rounded-[3px]"
        type="button"
      >
        Reset filters
      </button>
    </div>
  );
}
