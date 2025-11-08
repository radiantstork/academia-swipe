'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Extended Profile interface — combines old & new fields.
 */
export type Profile = {
  id: string | number;
  name: string;
  role: 'teacher' | 'student';
  subjects: string[];
  branches: Record<string, string[]>; // e.g. { "Computer Science": ["Databases"] }
  availability: string;

  // New detailed info
  age?: number;
  profession?: string;
  focusArea?: string;
  interests?: string[];
  achievements?: string[];
  languages?: string[];
  collaborationGoal?: string;
  rating?: number;
};

type MatchContextType = {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

/**
 * Combined initial data set.
 */
const initialProfiles: Profile[] = [
  // --- Previous example profiles ---
  {
    id: '1',
    name: 'Alice',
    role: 'student',
    subjects: ['Computer Science'],
    branches: { 'Computer Science': ['Algorithms', 'Databases'] },
    availability: 'Evenings',
    age: 23,
    profession: 'Graduate Student (CS)',
    focusArea: 'Research Paper',
    interests: ['Machine Learning', 'Computational Linguistics', 'Rust', 'Distributed Systems'],
    achievements: ['Published at ACL 2024 (Minor Author)', '4.0 GPA (Current)', 'Open Source Contributor'],
    languages: ['English (Native)', 'Mandarin (Intermediate)'],
    collaborationGoal: 'Seeking a partner to co-write a survey paper on causality in LLMs.',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Bob',
    role: 'teacher',
    subjects: ['Mathematics'],
    branches: { Mathematics: ['Algebra', 'Statistics'] },
    availability: 'Weekends',
    age: 45,
    profession: 'Research Professor (Physics)',
    focusArea: 'Mentorship',
    interests: ['Quantum Computing', 'Condensed Matter', 'Tensor Networks', 'Statistical Mechanics'],
    achievements: ['PhD from MIT', 'H-Index: 35', 'Fellow of the APS'],
    languages: ['English', 'German'],
    collaborationGoal: 'Open to mentoring driven undergraduates on fundamental concepts in QM and Field Theory.',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'Charlie',
    role: 'student',
    subjects: ['Philosophy'],
    branches: { Philosophy: ['Logic', 'Cognitive Science'] },
    availability: 'Mornings',
    age: 20,
    profession: 'Undergraduate (Philosophy)',
    focusArea: 'Skill Building',
    interests: ['Existentialism', 'Logic', 'Ethics', 'Cognitive Science'],
    achievements: ["Dean's List (3 Semesters)", 'Regional Debate Finalist'],
    languages: ['French (Native)', 'English (Fluent)', 'Latin (Reading)'],
    collaborationGoal: 'Looking for study partners for weekly logic problem sets.',
    rating: 3.5,
  },
  {
    id: '4',
    name: 'Diana',
    role: 'teacher',
    subjects: ['Computer Science'],
    branches: { 'Computer Science': ['Data Structures', 'Operating Systems'] },
    availability: 'Afternoons',
    age: 38,
    profession: 'Senior Lecturer (Software Engineering)',
    focusArea: 'Project Supervision',
    interests: ['Software Design', 'Databases', 'AI Education'],
    achievements: ['10 years teaching experience', 'Developed open-source courseware'],
    languages: ['English', 'Spanish'],
    collaborationGoal: 'Looking for students to co-develop educational tools using React and Node.',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Eve',
    role: 'student',
    subjects: ['Mathematics', 'Computer Science'],
    branches: { Mathematics: ['Calculus'], 'Computer Science': ['Algorithms'] },
    availability: 'Evenings',
    age: 22,
    profession: 'Undergraduate (Math & CS)',
    focusArea: 'Skill Building',
    interests: ['Data Analysis', 'Machine Learning', 'Probability'],
    achievements: ['Math Olympiad Finalist', 'Open Source Contributor'],
    languages: ['English', 'Japanese'],
    collaborationGoal: 'Seeking study partners for algorithmic problem-solving sessions.',
    rating: 4.2,
  },
];

export function MatchProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);

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
