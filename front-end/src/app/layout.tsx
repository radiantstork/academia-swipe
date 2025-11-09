import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import './globals.css';

import { MatchFormProvider } from './context/MatchFormContext';
import { ChatProvider } from './context/ChatContext';
import { MatchProvider } from './context/MatchContext';
import { ProfileProvider } from './context/ProfileContext';
import { UserProvider } from './context/UserContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Academia Swipe',
  description: 'Study Matching App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <UserProvider>
          <ProfileProvider>
            <MatchFormProvider>
              <MatchProvider>
                <ChatProvider>
                  <Navbar />
                  {children}
                </ChatProvider>
              </MatchProvider>
            </MatchFormProvider>
          </ProfileProvider>
        </UserProvider>
      </body>
    </html>
  );
}