"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="bg-gray-100 shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-gray-800">
          FitTrack
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
                Dashboard
              </Link>
              <Link href="/goals" className="text-gray-800 hover:text-gray-600">
                Goals
              </Link>
              <Link href="/progress" className="text-gray-800 hover:text-gray-600">
                Progress
              </Link>
              <Link href="/community" className="text-gray-800 hover:text-gray-600">
                Community
              </Link>
              <Link href="/settings" className="text-gray-800 hover:text-gray-600">
                Settings
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {children}
    </header>
  );
};

export default Navigation;