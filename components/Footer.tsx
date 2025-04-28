import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:gird-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold">LitStore</h2>
          <p className="text-sm text-gray-400 mt-2">
            Your #1 destination for amazing books. Discover, read, and enjoy!
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/books?page=1" className="hover:text-yellow-400">
                All Books
              </Link>
            </li>
            <li>
              <Link
                href="/books?page=1&sort=rating-desc"
                className="hover:text-yellow-400"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                href="/books?page=1&onSale=true"
                className="hover:text-yellow-400"
              >
                Promotions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                href="/customer-service#faq"
                className="hover:text-yellow-400"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/customer-service#shipping-returns"
                className="hover:text-yellow-400"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/customer-service#privacy-policy"
                className="hover:text-yellow-400"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/customer-service#terms-of-service"
                className="hover:text-yellow-400"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex space-x-4 text-gray-400 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="mt-4 text-sm">Subscribe to our newsletter</p>
          <div className="mt-2 flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full text-black rounded-l-md"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} LitStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
