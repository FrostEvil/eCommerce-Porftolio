import { genresArr } from "@/utils/static-db";
import Link from "next/link";
import { constants } from "vm";

const GENRES_COUNT = 6;

export default function Genres() {
  const genres = genresArr;
  const shuffledGenrs = genres.sort(() => Math.random() - 0.5);
  const genresToDisplay = shuffledGenrs.slice(0, GENRES_COUNT);

  const displayGenres = genresToDisplay.map((genre) => {
    return (
      <div key={genre.slug}>
        <Link
          href="/books"
          className="block p-4 bg-white shadow-md text-center hover:bg-yellow-400 hover:shadow-lg hover:scale-105 transition duration-300"
        >
          <p className="text-gray-900 text-lg font-semibold">{genre.name}</p>
        </Link>
      </div>
    );
  });

  return (
    <section className="py-12 px-6 container">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Explore by Genre
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
        {displayGenres}
      </div>
    </section>
  );
}
