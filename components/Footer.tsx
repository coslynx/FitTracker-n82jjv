"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-white font-bold text-xl">
              FitTrack
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-200">
              About
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-gray-200">
                  Dashboard
                </Link>
                <Link href="/goals" className="hover:text-gray-200">
                  Goals
                </Link>
                <Link href="/progress" className="hover:text-gray-200">
                  Progress
                </Link>
                <Link href="/community" className="hover:text-gray-200">
                  Community
                </Link>
                <Link href="/settings" className="hover:text-gray-200">
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-200">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-gray-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 FitTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;