'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Profile } from '@/app/context/MatchContext';
import StudyMatchCard from '@/components/StudyMatchCard';

type SwipeCardProps = {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
};

export default function SwipeCard({ profile, onSwipe }: SwipeCardProps) {
  const [hasSwiped, setHasSwiped] = useState(false);

  // Motion value that tracks drag X position
  const x = useMotionValue(0);

  // Rotate slightly as we drag left/right
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (hasSwiped) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipePower = Math.abs(offset) * velocity;
    const threshold = 8000;

    if (swipePower > threshold) {
      setHasSwiped(true);
      onSwipe('right');
    } else if (swipePower < -threshold) {
      setHasSwiped(true);
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing select-none"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      style={{ x, rotate }} // 👈 rotation and x are bound to motion
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.25 }}
    >
      <StudyMatchCard candidate={profile} />
    </motion.div>
  );
}
