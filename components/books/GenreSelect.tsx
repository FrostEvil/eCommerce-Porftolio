import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { genresArr } from "@/utils/static-db";

type GenreSelectProps = {
  genre: string;
  setGenre: Dispatch<SetStateAction<string>>;
};

export default function GenreSelect({ genre, setGenre }: GenreSelectProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-700">Genre:</h2>
      <div className="mt-2">
        <Select value={genre} onValueChange={(e) => setGenre(e)}>
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
  );
}
