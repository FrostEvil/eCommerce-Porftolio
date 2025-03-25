import "../style/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";

export const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
