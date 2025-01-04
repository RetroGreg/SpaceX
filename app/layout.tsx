import './globals.css';
import { ReactNode } from 'react';
import Header from "../components/Header";

export const metadata = {
  title: 'SpaceX Dashboard',
  description: 'Monitoring des lancements via Launch Library 2',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen w-full flex flex-col">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {Array.from({ length: 200 }).map((_, index) => (
              <div
                key={index}
                className="absolute bg-white rounded-full opacity-[0.3] animate-twinkle"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  top: `${Math.random() * 100}vh`,
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
          {children}
        </main>

        {/* Footer */}
        <footer className="relative bg-gray-900 bg-opacity-95 text-center p-6 text-sm shadow-lg">
          <div
            className="absolute inset-0 bg-[url('/stars.jpg')] bg-cover opacity-30 pointer-events-none"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <p className="relative z-10">© 2025 - RetroGreg | Explorez l&apos;infini et au-delà</p>
        </footer>
      </body>
    </html>
  );
}
