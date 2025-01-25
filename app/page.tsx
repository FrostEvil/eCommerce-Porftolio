import Link from "next/link";
import "../style/globals.css";

export default function Page() {
  return (
    <>
      <main className="flex relative bg-hero-pattern bg-center bg-cover h-[calc(100vh-3rem)] w-full">
        <div className="flex flex-col gap-y-10 justify-center items-center w-full h-full z-20">
          <h1 className="text-white text-4xl">
            Books for Every <span className="text-red-600">Reader</span>,
            Stories for Every <span className="text-orange-600">Soul.</span>
          </h1>
          <div>
            <p className="text-white text-4xl">
              <Link
                href="/products"
                className="underline underline-offset-8 decoration-blue-700 hover:text-blue-700 duration-200 "
              >
                Shop Now
              </Link>
              &nbsp;and Start Your Next Chapter.
            </p>
          </div>
        </div>
        <div className="absolute inset-0  bg-[rgb(0,0,0,0.75)] z-10"></div>
      </main>
    </>
  );
}
