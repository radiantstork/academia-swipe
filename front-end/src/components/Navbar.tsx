'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        StudyMatch
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/findmatch">
          <Button
            variant={pathname === '/findmatch' ? 'default' : 'outline'}
            className="rounded-2xl px-4"
          >
            Find a Match
          </Button>
        </Link>
      </div>
    </nav>
  );
}
