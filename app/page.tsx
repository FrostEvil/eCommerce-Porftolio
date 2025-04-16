import Link from "next/link";
import "../style/globals.css";
import FeaturedBooks from "@/components/homePage/FeaturedBooksSection";
import Testimonials from "@/components/homePage/TestimonialsSection";
import Genres from "@/components/homePage/GenresSection";
import Promotions from "@/components/homePage/PromotionsSection";

export default function HomePage() {
  return (
    <>
      <section className="relative bg-hero-pattern bg-center bg-cover  bg-no-repeat h-screen flex justify-center items-center">
        <div className="absolute inset-0  bg-black/55 z-10"></div>
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold hero-heading">
            Your Perfect <span className="text-blue-500">Book,</span> Your Next
            <span className="text-yellow-500"> Adventure.</span>
          </h1>

          <p className="text-xl md:text-3xl mt-4 md:mt-6 ">
            Find your next great read today!
          </p>
          <Link
            href="/books?page=1"
            className="mt-6 md:mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition duration-200"
          >
            📖 Browse Our Collection
          </Link>
        </div>
      </section>
      <div className="my-12 flex flex-col gap-y-8 container">
        <FeaturedBooks />
        <Testimonials />
        <Genres />
        <Promotions />
      </div>
    </>
  );
}
