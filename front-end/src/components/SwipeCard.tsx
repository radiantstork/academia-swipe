'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';

export default function SwipeCard({ profile, onSwipe }: {
  profile: any,
  onSwipe: (direction: 'left' | 'right') => void
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest > 200) {
        onSwipe('right');
      } else if (latest < -200) {
        onSwipe('left');
      }
    });
    return () => unsubscribe();
  }, [x, onSwipe]);

  return (
    <motion.div
      className="absolute w-full flex justify-center"
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card className="w-80 shadow-xl bg-white border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {profile.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-gray-600">🎓 Role: {profile.role}</p>
          <p className="text-gray-600">📚 Subjects: {profile.subjects.join(', ')}</p>
          <p className="text-gray-600">🕒 Availability: {profile.availability}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
