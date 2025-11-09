'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/router';


export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition">
        AcademiaSwipe
      </Link>

      <div className="flex gap-3 items-center">
        

        {user ? (
          <>
            <span className="text-gray-700 text-sm">Hi, {user.username.split(' ')[0]} 👋</span>
            <Button onClick={() => {logout(); window.location.href = '/';}} variant="outline" className="text-sm">
              Logout
            </Button>
            <Link href="/profile">
              Go to profile
            </Link>
            <Link href="/findmatch" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Find a match
            </Link>
            <Link href="/chats" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Chats
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" className="text-sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
