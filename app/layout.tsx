import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

export const metadata = {
  title: 'SpaceX Dashboard',
  description: 'Monitoring des lancements via Launch Library 2',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
<body className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen w-full flex flex-col">
{/* Header */}
        <header className="p-4 bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-700">
          <nav className="flex justify-between items-center max-w-5xl mx-auto">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/SpaceX.png"
                alt="SpaceX Logo"
                width={200} 
                height={100}
                priority
              />
            </div>
            {/* Navigation */}
            <Link href="/" className="hover:text-gray-400 transition">
  Accueil
</Link>
<Link href="/launches" className="hover:text-gray-400 transition">
  Lancements à venir
</Link>
          </nav>
        </header>

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
