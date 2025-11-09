'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import { useMatch } from '@/app/context/MatchContext';
import { useChats } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MatchPage() {
  const { profiles } = useMatch();
  const { createChat, chats } = useChats();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  // 🎯 Filters
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [subjectFilter, setSubjectFilter] = useState('');

  // 💡 Filter logic using useMemo for performance
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesRole = roleFilter === 'all' || p.role === roleFilter;
      const matchesRating = (p.rating || 0) >= minRating;
      const matchesSubject =
        subjectFilter.trim() === '' ||
        p.subjects?.some((s) => s.toLowerCase().includes(subjectFilter.toLowerCase())) ||
        p.interests?.some((i) => i.toLowerCase().includes(subjectFilter.toLowerCase()));
      return matchesRole && matchesRating && matchesSubject;
    });
  }, [profiles, roleFilter, minRating, subjectFilter]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentProfile = filteredProfiles[currentIndex];
    if (!currentProfile) return;

    if (direction === 'right') {
      console.log('Matched with:', currentProfile.name);

      const lastId = (parseInt(chats.at(-1)?.id || '0', 10) + 1).toString();

      // Create new chat automatically
      const newChat = createChat(
        [
          { id: 'self', name: 'You', role: 'student', subjects: [], branches: {}, availability: '' },
          currentProfile,
        ],
        lastId
      );

      // Navigate to that chat
      router.push(`/chats/${newChat.id}`);
    }

    // Move to next profile
    setCurrentIndex((prev) => prev + 1);
  };

  const currentProfile = filteredProfiles[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      {/* 🧭 FILTER BAR */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl bg-white shadow-md p-4 rounded-xl">
        {/* Role */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Role</label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Min Rating</label>
          <Input
            type="number"
            min={0}
            max={5}
            step={0.1}
            className="w-24"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          />
        </div>

        {/* Subject / Interest */}
        <div className="flex flex-col flex-grow">
          <label className="text-sm text-gray-600 mb-1">Subject / Interest</label>
          <Input
            type="text"
            placeholder="e.g. Machine Learning"
            className="w-full"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          />
        </div>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={() => {
            setRoleFilter('all');
            setMinRating(0);
            setSubjectFilter('');
            setCurrentIndex(0);
          }}
        >
          Reset
        </Button>
      </div>

      {/* 🧑‍🏫 MATCH AREA */}
      <div className="flex flex-col items-center justify-center flex-grow mt-4">
        {currentProfile ? (
          <AnimatePresence>
            <SwipeCard key={currentProfile.id} profile={currentProfile} onSwipe={handleSwipe} />
          </AnimatePresence>
        ) : filteredProfiles.length === 0 ? (
          <p className="text-gray-600 text-center mt-8">No profiles match your filters. 🧐</p>
        ) : (
          <p className="text-gray-600 text-center mt-8">No more profiles available. 🎉</p>
        )}
      </div>
    </div>
  );
}
