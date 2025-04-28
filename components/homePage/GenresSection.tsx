import { genresArr } from "@/utils/static-db";
import Link from "next/link";

const GENRES_COUNT = 6;

export default function Genres() {
  const genres = genresArr;
  const shuffledGenrs = genres.sort(() => Math.random() - 0.5);
  const genresToDisplay = shuffledGenrs.slice(0, GENRES_COUNT);

  const displayGenres = genresToDisplay.map((genre) => {
    return (
      <div key={genre.slug}>
        <Link
          href={`/books?page=1&genre=${genre.name}`}
          className="block p-4 bg-white shadow-md text-center hover:bg-yellow-400 hover:shadow-lg hover:scale-105 transition duration-300"
        >
          <p className="text-gray-900 text-lg font-semibold">{genre.name}</p>
        </Link>
      </div>
    );
  });

  return (
    <section className="bg-white shadow-sm overflow-hidden">
      <h2 className=" pl-6 py-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 text-3xl font-bold text-gray-900 ">
        Explore by Genre
      </h2>
      <div className="py-8 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
        {displayGenres}
      </div>
    </section>
  );
}
