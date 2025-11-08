'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Profile = {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  subjects: string[];
  branches: Record<string, string[]>; // e.g., { "Computer Science": ["Databases"] }
  availability: string;
};

type MatchContextType = {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Alice',
      role: 'student',
      subjects: ['Computer Science'],
      branches: { 'Computer Science': ['Algorithms', 'Databases'] },
      availability: 'Evenings',
    },
    {
      id: '2',
      name: 'Bob',
      role: 'teacher',
      subjects: ['Mathematics'],
      branches: { Mathematics: ['Algebra', 'Statistics'] },
      availability: 'Weekends',
    },
    {
      id: '3',
      name: 'Charlie',
      role: 'student',
      subjects: ['Physics'],
      branches: { Physics: ['Mechanics'] },
      availability: 'Mornings',
    },
    {
      id: '4',
      name: 'Diana',
      role: 'teacher',
      subjects: ['Computer Science'],
      branches: { 'Computer Science': ['Data Structures', 'Operating Systems'] },
      availability: 'Afternoons',
    },
    {
      id: '5',
      name: 'Eve',
      role: 'student',
      subjects: ['Mathematics', 'Computer Science'],
      branches: { Mathematics: ['Calculus'], 'Computer Science': ['Algorithms'] },
      availability: 'Evenings',
    },
    {
      id: '6',
      name: 'Frank',
      role: 'teacher',
      subjects: ['Physics'],
      branches: { Physics: ['Electromagnetism', 'Quantum Physics'] },
      availability: 'Weekdays',
    },
    {
      id: '7',
      name: 'john',
      role: 'teacher',
      subjects: ['Physics'],
      branches: { Physics: ['Electromagnetism', 'Quantum Physics'] },
      availability: 'Weekdays',
    },
  ]);

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  return (
    <MatchContext.Provider value={{ profiles, addProfile }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatch must be used within MatchProvider');
  return context;
}
