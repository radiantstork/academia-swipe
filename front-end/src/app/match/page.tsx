'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SwipeCard from '@/components/SwipeCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useMatch } from '@/app/context/MatchContext';
import { useMatchForm } from '@/app/context/MatchFormContext';
import { Button } from '@/components/ui/button';

export default function MatchPage() {
  const router = useRouter();
  const { profiles } = useMatch();
  const { formData } = useMatchForm();

  

  // Filter profiles based on form selections
  const filteredProfiles = profiles.filter((profile) => {
    // Must match role/target
    if (formData.target && profile.role !== formData.target) return false;

    // Must match at least one subject
    if (formData.subjects.length > 0) {
      const subjectMatch = formData.subjects.some((subj) => profile.subjects.includes(subj));
      if (!subjectMatch) return false;
    }

    // Must match at least one branch per subject
    for (const subj of formData.subjects) {
      const selectedBranches = formData.branches[subj] || [];
      if (selectedBranches.length > 0) {
        const profileBranches = profile.branches[subj] || [];
        if (!selectedBranches.some((branch) => profileBranches.includes(branch))) return false;
      }
    }

    return true;
  });

  console.log(filteredProfiles.length);


  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log('function call')
    if (!filteredProfiles[currentIndex]) return;

    console.log(`Swiped ${direction} on ${filteredProfiles[currentIndex].name}`);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center h-[85vh]">
        <AnimatePresence>
          {filteredProfiles[currentIndex] ? (
            <motion.div
              key={filteredProfiles[currentIndex].id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <SwipeCard profile={filteredProfiles[currentIndex]} onSwipe={handleSwipe} />
            </motion.div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">🎉 No more profiles!</h2>
              <Button onClick={() => router.push('/chats')}>Go to Chats</Button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {currentIndex === filteredProfiles.length && <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Button variant="outline" onClick={() => router.push('/chats')}>
          💬 Go to Chats
        </Button>
      </div>}
    </main>
  );
}
