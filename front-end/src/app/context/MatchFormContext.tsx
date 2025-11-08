'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type FormData = {
  role: 'teacher' | 'student' | '';
  target: 'teacher' | 'student' | '';
  subjects: string[];
  branches: Record<string, string[]>; // e.g., { "Computer Science": ["Databases", "Algorithms"] }
};

type MatchFormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const MatchFormContext = createContext<MatchFormContextType | undefined>(undefined);

export function MatchFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    role: '',
    target: '',
    subjects: [],
    branches: {},
  });

  return (
    <MatchFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </MatchFormContext.Provider>
  );
}

export function useMatchForm() {
  const context = useContext(MatchFormContext);
  if (!context) {
    throw new Error('useMatchForm must be used within a MatchFormProvider');
  }
  return context;
}
