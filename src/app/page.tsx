import Link from "next/link";
import Philosophy from "./_components/landingpage/philosophy";
import Flag from "./_components/flag";
import Features from "./_components/landingpage/features";
import Features2 from "./_components/landingpage/features2";
import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Flag name="landingpage.philosphy" enabled={<Philosophy />} />
      <Pricing />
      <Features />
      <Features2 />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2 font-light">
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-2 font-light">
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-500 hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-gray-500 hover:underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775A4.934 4.934 0 0 0 23.337 3a9.867 9.867 0 0 1-3.127 1.195A4.918 4.918 0 0 0 16.616.64a4.918 4.918 0 0 0-4.834 6.045A13.978 13.978 0 0 1 1.67 3.15 4.822 4.822 0 0 0 3.15 9.6a4.902 4.902 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.828 4.908 4.908 0 0 1-2.224.084 4.924 4.924 0 0 0 4.598 3.417A9.867 9.867 0 0 1 .96 20.547a13.937 13.937 0 0 0 7.548 2.213c9.057 0 14.01-7.506 14.01-14.012 0-.213-.005-.425-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-gray-500 hover:underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0H1.325C.594 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.414c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.462.098 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.591l-.468 3.622h-3.123V24h6.116c.729 0 1.322-.593 1.322-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-gray-500 hover:underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.23 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.78 24 1.77 24h20.46C23.22 24 24 23.22 24 22.27V1.73C24 .78 23.22 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zm-1.78-13.04h-.02c-1.19 0-1.95-.82-1.95-1.85 0-1.05.77-1.85 1.97-1.85 1.2 0 1.95.8 1.97 1.85-.02 1.03-.77 1.85-1.97 1.85zM20.45 20.45h-3.56v-5.56c0-1.4-.5-2.36-1.76-2.36-.95 0-1.51.65-1.75 1.28-.09.21-.11.51-.11.8v5.84h-3.56s.05-9.48 0-10.45h3.56v1.48c.47-.74 1.31-1.8 3.19-1.8 2.33 0 4.08 1.52 4.08 4.79v6.97h-.01z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-24 text-center font-light text-gray-400">
            <p>
              &copy; 2024 Markus Kottländer.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
