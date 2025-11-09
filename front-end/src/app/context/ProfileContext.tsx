"use client";

import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  createContext, 
  useContext, 
  ReactNode 
} from 'react';

// --- 1. Define all the types ---

export interface FormErrors {
  occupation?: string;
  sex?: string;
  strong?: string;
  weak?: string;
  subjects?: string;
  dob?: string;
  university?: string;
}

// Type for the profile data itself
interface StudentProfileData {
  occupation: string;
  sex: string;
  strongPoints: string;
  weakPoints: string;
  subjects: string[];
  savedAt: string;
  dob: string;
  university: string;
  wantsToTeach: boolean;
  awards: string[];
  languages: string[];
  // New teaching fields
  availableHours?: string;
  experience?: string;
  yearsTeaching?: number;
  teachingCertificates?: string[];
}

// Type for the user account (from your auth system)
interface User {
  id: number;
  username: string;
  email: string;
  password: string; 
  createdAt: string;
  profile?: StudentProfileData; // The profile is nested inside the user
}

// Type for the currently logged-in user
interface CurrentUser {
  username: string;
  email: string;
}

// This interface defines everything the context will provide
interface ProfileContextType {
  // Existing State...
  occupation: string;
  setOccupation: React.Dispatch<React.SetStateAction<string>>;
  sex: string;
  setSex: React.Dispatch<React.SetStateAction<string>>;
  strongPoints: string;
  setStrongPoints: React.Dispatch<React.SetStateAction<string>>;
  weakPoints: string;
  setWeakPoints: React.Dispatch<React.SetStateAction<string>>;
  subjects: string[];
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  subjectInput: string;
  setSubjectInput: React.Dispatch<React.SetStateAction<string>>;
  errors: FormErrors;
  isSubmitting: boolean;
  showSuccess: boolean;
  dob: string;
  setDob: React.Dispatch<React.SetStateAction<string>>;
  university: string;
  setUniversity: React.Dispatch<React.SetStateAction<string>>;
  wantsToTeach: boolean;
  setWantsToTeach: React.Dispatch<React.SetStateAction<boolean>>;
  awards: string[];
  setAwards: React.Dispatch<React.SetStateAction<string[]>>;
  awardInput: string;
  setAwardInput: React.Dispatch<React.SetStateAction<string>>;
  languages: string[];
  setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  languageInput: string;
  setLanguageInput: React.Dispatch<React.SetStateAction<string>>;
  currentUser: CurrentUser | null;

  // New Teaching State
  availableHours: string;
  setAvailableHours: React.Dispatch<React.SetStateAction<string>>;
  experience: string;
  setExperience: React.Dispatch<React.SetStateAction<string>>;
  yearsTeaching: number | string; // Use string to allow empty input
  setYearsTeaching: React.Dispatch<React.SetStateAction<number | string>>;
  teachingCertificates: string[];
  setTeachingCertificates: React.Dispatch<React.SetStateAction<string[]>>;
  certificateInput: string;
  setCertificateInput: React.Dispatch<React.SetStateAction<string>>;

  // Derived State
  progress: number;
  
  // Handlers...
  handleAddSubject: () => void;
  handleAddSuggestion: (suggestion: string) => void;
  handleRemoveSubject: (subjectToRemove: string) => void;
  handleSubmit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  handleReset: () => void;
  handleAddAward: () => void;
  handleRemoveAward: (award: string) => void;
  handleAddLanguage: () => void;
  handleRemoveLanguage: (lang: string) => void;

  // New Teaching Handlers
  handleAddCertificate: () => void;
  handleRemoveCertificate: (cert: string) => void;
}

// --- 2. Create the Context ---
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// --- 3. Create the Provider Component ---
export function ProfileProvider({ children }: { children: ReactNode }) {
  // Form state
  const [occupation, setOccupation] = useState("");
  const [sex, setSex] = useState("");
  const [strongPoints, setStrongPoints] = useState("");
  const [weakPoints, setWeakPoints] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [dob, setDob] = useState("");
  const [university, setUniversity] = useState("");
  const [wantsToTeach, setWantsToTeach] = useState(false);
  const [awards, setAwards] = useState<string[]>([]);
  const [awardInput, setAwardInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");

  // New teaching state
  const [availableHours, setAvailableHours] = useState("");
  const [experience, setExperience] = useState("");
  const [yearsTeaching, setYearsTeaching] = useState<number | string>("");
  const [teachingCertificates, setTeachingCertificates] = useState<string[]>([]);
  const [certificateInput, setCertificateInput] = useState("");

  // Form helper state
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to hold the logged-in user's info
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Load data based on the logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedDb = localStorage.getItem('users_db');

    if (storedUser && storedDb) {
      const userObj: CurrentUser = JSON.parse(storedUser);
      setCurrentUser(userObj); 
      
      const allUsers: User[] = JSON.parse(storedDb);
      const user = allUsers.find(u => u.email === userObj.email);

      if (user && user.profile) {
        const { profile } = user;
        setOccupation(profile.occupation || "");
        setSex(profile.sex || "");
        setStrongPoints(profile.strongPoints || "");
        setWeakPoints(profile.weakPoints || "");
        setSubjects(profile.subjects || []);
        setDob(profile.dob || "");
        setUniversity(profile.university || "");
        setWantsToTeach(profile.wantsToTeach || false);
        setAwards(profile.awards || []);
        setLanguages(profile.languages || []);
        // Load new teaching data
        setAvailableHours(profile.availableHours || "");
        setExperience(profile.experience || "");
        setYearsTeaching(profile.yearsTeaching || "");
        setTeachingCertificates(profile.teachingCertificates || []);
      }
    }
  }, []); // Empty array [] means this runs once on mount

  // Progress now has 7 required items
  const progress = useMemo(() => {
    let filled = 0;
    if (occupation) filled++; // 1
    if (sex) filled++; // 2
    if (strongPoints.trim().length >= 5) filled++; // 3
    if (weakPoints.trim().length >= 5) filled++; // 4
    if (subjects.length > 0) filled++; // 5
    if (dob) filled++; // 6
    if (university) filled++; // 7
    return (filled / 7) * 100;
  }, [occupation, sex, strongPoints, weakPoints, subjects, dob, university]);

  // --- Subject Handlers (unchanged) ---
  const handleAddSubject = useCallback(() => {
    const val = subjectInput.trim();
    if (val && !subjects.includes(val)) {
      setSubjects(prevSubjects => [...prevSubjects, val]);
    }
    setSubjectInput("");
  }, [subjectInput, subjects]);

  const handleAddSuggestion = useCallback((suggestion: string) => {
    if (!subjects.includes(suggestion)) {
      setSubjects(prevSubjects => [...prevSubjects, suggestion]);
    }
  }, [subjects]);

  const handleRemoveSubject = useCallback((subjectToRemove: string) => {
    setSubjects(prevSubjects => prevSubjects.filter((s) => s !== subjectToRemove));
  }, []);

  // --- Handlers for Awards (unchanged) ---
  const handleAddAward = useCallback(() => {
    const val = awardInput.trim();
    if (val && !awards.includes(val)) {
      setAwards(prevAwards => [...prevAwards, val]);
    }
    setAwardInput("");
  }, [awardInput, awards]);

  const handleRemoveAward = useCallback((awardToRemove: string) => {
    setAwards(prevAwards => prevAwards.filter((a) => a !== awardToRemove));
  }, []);

  // --- Handlers for Languages (unchanged) ---
  const handleAddLanguage = useCallback(() => {
    const val = languageInput.trim();
    if (val && !languages.includes(val)) {
      setLanguages(prevLanguages => [...prevLanguages, val]);
    }
    setLanguageInput("");
  }, [languageInput, languages]);

  const handleRemoveLanguage = useCallback((langToRemove: string) => {
    setLanguages(prevLanguages => prevLanguages.filter((l) => l !== langToRemove));
  }, []);

  // --- NEW: Handlers for Certificates ---
  const handleAddCertificate = useCallback(() => {
    const val = certificateInput.trim();
    if (val && !teachingCertificates.includes(val)) {
      setTeachingCertificates(prevCerts => [...prevCerts, val]);
    }
    setCertificateInput("");
  }, [certificateInput, teachingCertificates]);

  const handleRemoveCertificate = useCallback((certToRemove: string) => {
    setTeachingCertificates(prevCerts => prevCerts.filter((c) => c !== certToRemove));
  }, []);


  // --- Validation (unchanged) ---
  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    let ok = true;

    if (!occupation) { newErrors.occupation = "Choose occupation"; ok = false; }
    if (!sex) { newErrors.sex = "Select sex"; ok = false; }
    if (strongPoints.trim().length < 5) { newErrors.strong = "Too short (min 5 chars)"; ok = false; }
    if (weakPoints.trim().length < 5) { newErrors.weak = "Too short (min 5 chars)"; ok = false; }
    if (subjects.length === 0) { newErrors.subjects = "Add at least one subject"; ok = false; }
    if (!dob) { newErrors.dob = "Date of birth is required"; ok = false; }
    if (!university.trim()) { newErrors.university = "University is required"; ok = false; }

    setErrors(newErrors);
    return ok;
  }, [occupation, sex, strongPoints, weakPoints, subjects, dob, university]);

  
  // --- handleSubmit (saves all fields to users_db) ---
  const handleSubmit = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // 1. Create the full profile data object
    const profile: StudentProfileData = {
      occupation, sex, strongPoints, weakPoints, subjects,
      savedAt: new Date().toISOString(),
      dob,
      university,
      wantsToTeach,
      awards,
      languages,
      // Add new teaching data
      availableHours,
      experience,
      yearsTeaching: Number(yearsTeaching) || 0, // Ensure it's a number
      teachingCertificates,
    };

    // 2. Get current user and user database
    const storedUser = localStorage.getItem('currentUser');
    const storedDb = localStorage.getItem('users_db');

    if (storedUser && storedDb) {
      const currentUser: CurrentUser = JSON.parse(storedUser);
      const allUsers: User[] = JSON.parse(storedDb);

      // 3. Find and update the user in the database
      const updatedUsers = allUsers.map(user => {
        if (user.email === currentUser.email) {
          return { ...user, profile: profile };
        }
        return user;
      });

      // 4. Save the entire updated database back to localStorage
      localStorage.setItem('users_db', JSON.stringify(updatedUsers));
    }

    setTimeout(() => {
      console.log('Profile saved for user:', profile);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 500);
    }, 500);
  }, [
    validate, occupation, sex, strongPoints, weakPoints, subjects, 
    dob, university, wantsToTeach, awards, languages, 
    availableHours, experience, yearsTeaching, teachingCertificates // Add new dependencies
  ]);

  // --- handleReset (clears all fields) ---
  const handleReset = useCallback(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedDb = localStorage.getItem('users_db');

    if (storedUser && storedDb) {
      const currentUser: CurrentUser = JSON.parse(storedUser);
      const allUsers: User[] = JSON.parse(storedDb);
      const updatedUsers = allUsers.map(user => {
        if (user.email === currentUser.email) {
          const { profile, ...userWithoutProfile } = user;
          return userWithoutProfile;
        }
        return user;
      });
      localStorage.setItem('users_db', JSON.stringify(updatedUsers));
    }

    // Reset all form state
    setOccupation("");
    setSex("");
    setStrongPoints("");
    setWeakPoints("");
    setSubjects([]);
    setSubjectInput("");
    setDob("");
    setUniversity("");
    setWantsToTeach(false);
    setAwards([]);
    setAwardInput("");
    setLanguages([]);
    setLanguageInput("");
    setErrors({});
    // Reset new teaching state
    setAvailableHours("");
    setExperience("");
    setYearsTeaching("");
    setTeachingCertificates([]);
    setCertificateInput("");
  }, []);

  // Assemble the value to be passed to all consuming components
  const value = {
    occupation, setOccupation,
    sex, setSex,
    strongPoints, setStrongPoints,
    weakPoints, setWeakPoints,
    subjects, setSubjects,
    subjectInput, setSubjectInput,
    errors,
    isSubmitting,
    showSuccess,
    progress,
    handleAddSubject,
    handleAddSuggestion,
    handleRemoveSubject,
    handleSubmit,
    handleReset,
    
    dob, setDob,
    university, setUniversity,
    wantsToTeach, setWantsToTeach,
    awards, setAwards,
    awardInput, setAwardInput,
    languages, setLanguages,
    languageInput, setLanguageInput,
    handleAddAward,
    handleRemoveAward,
    handleAddLanguage,
    handleRemoveLanguage,
    
    currentUser,

    // Add new teaching values
    availableHours, setAvailableHours,
    experience, setExperience,
    yearsTeaching, setYearsTeaching,
    teachingCertificates, setTeachingCertificates,
    certificateInput, setCertificateInput,
    handleAddCertificate,
    handleRemoveCertificate,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

// --- 4. Create the Custom Hook ---
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};