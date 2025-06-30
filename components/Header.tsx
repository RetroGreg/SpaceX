"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="p-4 bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-700">
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/SpaceX.png" alt="SpaceX Logo" width={200} height={200} />
        </div>

        {/* Menu burger (mobile only) */}
        <div className="sm:hidden">
          <button
            className="text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-gray-800 text-center p-4 flex flex-col gap-2">
              <Link
                href="/"
                className="hover:text-gray-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/launches"
                className="hover:text-gray-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Lancements à venir
              </Link>
            </div>
          )}
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex gap-8 text-sm font-semibold">
          <Link href="/" className="hover:text-gray-400 transition">
            Accueil
          </Link>
          <Link href="/launches" className="hover:text-gray-400 transition">
            Lancements à venir
          </Link>
        </div>
      </nav>
    </header>
  );
}
