import "../style/globals.css";
import { Merriweather } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/Footer";

export const merriweather = Merriweather({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>LitStore - Your Book Haven</title>
        <meta
          name="description"
          content="Find your next great read at LitStore, your ultimate online bookstore."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${merriweather.className} bg-gray-100`}>
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
