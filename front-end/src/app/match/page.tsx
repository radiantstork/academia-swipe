'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import { useMatch } from '@/app/context/MatchContext';
import { useChats } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';

export default function MatchPage() {
  const { profiles } = useMatch();
  const { createChat, chats } = useChats();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    if (direction === 'right') {
      console.log('Matched with:', currentProfile.name);

      console.log(chats);

      const lastId = (parseInt(chats.at(-1)?.id || '0', 10) + 1).toString()

      console.log(lastId);
      
      

      // Create new chat automatically
      const newChat = createChat([
        { id: 'self', name: 'You', role: 'student', subjects: [], branches: {}, availability: '' },
        currentProfile,
      ], lastId);

      // Optionally navigate directly to that chat
      router.push(`/chats/${newChat.id}`);
    }

    // Move to next profile
    setCurrentIndex((prev) => prev + 1);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {currentProfile ? (
        <AnimatePresence>
          <SwipeCard key={currentProfile.id} profile={currentProfile} onSwipe={handleSwipe} />
        </AnimatePresence>
      ) : (
        <p className="text-gray-600 text-center">No more profiles available. 🎉</p>
      )}
    </div>
  );
}
