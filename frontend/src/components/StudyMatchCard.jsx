"use client";
import React, { useState, useCallback, useMemo } from 'react';
// Star is already imported, and will be used for the rating display
import { User, Star, Globe, Zap, Target, BookOpen, X, Heart, MessageSquare } from 'lucide-react';

// FIX 2: List of unique anonymous names
const ANONYMOUS_NAMES = ["Anonymous Duck", "Anonymous Elephant", "Anonymous Giraffe", "Anonymous Hippo", "Anonymous Llama"];

// --- MOCK DATA (Changed to include a rating) ---
const initialCandidates = [
  {
    id: 1,
    age: 23,
    profession: 'Graduate Student (CS)',
    focusArea: 'Research Paper',
    interests: ['Machine Learning', 'Computational Linguistics', 'Rust', 'Distributed Systems'],
    achievements: ['Published at ACL 2024 (Minor Author)', '4.0 GPA (Current)', 'Open Source Contributor'],
    languages: ['English (Native)', 'Mandarin (Intermediate)'],
    collaborationGoal: 'Seeking a partner to co-write a survey paper on causality in LLMs.',
    rating: 4.8 // NEW RATING PROPERTY
  },
  {
    id: 2,
    age: 45,
    profession: 'Research Professor (Physics)',
    focusArea: 'Mentorship',
    interests: ['Quantum Computing', 'Condensed Matter', 'Tensor Networks', 'Statistical Mechanics'],
    achievements: ['PhD from MIT', 'H-Index: 35', 'Fellow of the APS'],
    languages: ['English', 'German'],
    collaborationGoal: 'Open to mentoring driven undergraduates on fundamental concepts in QM and Field Theory.',
    rating: 5.0 // NEW RATING PROPERTY
  },
  {
    id: 3,
    age: 20,
    profession: 'Undergraduate (Philosophy)',
    focusArea: 'Skill Building',
    interests: ['Existentialism', 'Logic', 'Ethics', 'Cognitive Science'],
    achievements: ['Dean\'s List (3 Semesters)', 'Regional Debate Finalist'],
    languages: ['French (Native)', 'English (Fluent)', 'Latin (Reading)'],
    collaborationGoal: 'Looking for study partners for weekly logic problem sets.',
    rating: 3.5 // NEW RATING PROPERTY
  }
];

// --- UTILITY COMPONENTS ---

const CardHeader = ({ Icon, title }) => (
  // VIBRANCY EDIT 1: Changed fuchsia-400 to a brighter, electric cyan-300.
  <h2 className="flex items-center text-sm font-semibold text-cyan-300 mb-1 mt-2 uppercase tracking-wider border-b border-gray-700/50 pb-1">
    <Icon className="w-4 h-4 mr-2" />
    {title}
  </h2>
);

const Chip = ({ children }) => (
  // VIBRANCY EDIT 2: Changed violet-900/50 and text-violet-300 to a high-contrast electric pink/fuchsia theme.
  <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-fuchsia-900/50 text-pink-300 rounded-full transition duration-200 hover:bg-fuchsia-800 border border-pink-700/50">
    {children}
  </span>
);

// NEW UTILITY COMPONENT: StarRating
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Adjusted to use a warm, recognizable color for the stars
  const STAR_COLOR = "text-yellow-400"; 
  const EMPTY_COLOR = "text-gray-600";
  const STAR_SIZE = "w-4 h-4";

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${STAR_SIZE} ${STAR_COLOR} fill-current`} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          {/* Base full star color */}
          <Star className={`${STAR_SIZE} ${STAR_COLOR} fill-current`} />
          {/* Overlay to create half-star effect (cuts off the right half) */}
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
             <Star className={`${STAR_SIZE} ${STAR_COLOR} fill-current`} />
          </div>
          {/* Empty star on top to complete the shape */}
           <Star className={`${STAR_SIZE} ${EMPTY_COLOR} absolute top-0 left-0`} />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${STAR_SIZE} ${EMPTY_COLOR}`} />
      ))}
      {/* Display numerical rating */}
      <span className="ml-2 text-sm font-bold text-yellow-300">{rating.toFixed(1)}</span>
    </div>
  );
};


// --- MAIN CARD COMPONENT ---

const StudyMatchCard = ({ candidate }) => {
  // Destructure the new rating property
  const { id, age, profession, focusArea, interests, achievements, languages, collaborationGoal, rating } = candidate;
  const profileTitle = ANONYMOUS_NAMES[(id - 1) % ANONYMOUS_NAMES.length]; 

  return (
    // FLASHY BORDER EDIT: Removed Tailwind border/ring classes and added a custom `neon-border-flash` class.
    <div className="bg-gray-900 text-gray-100 rounded-xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden transition duration-500 transform hover:scale-[1.01] flex flex-col h-full border-4 border-transparent **neon-border-flash**">
      
      {/* Anonymous Header / Abstract Identity - UNIFIED BACKGROUND */}
      <div className="p-6 bg-gray-900 flex items-center justify-between border-b border-cyan-700/50"> {/* VIBRANCY: Changed indigo to cyan */}
        <div className="flex items-center space-x-4">
          {/* VIBRANCY EDIT 3: Changed fuchsia circle to electric cyan */}
          <div className="w-16 h-16 bg-cyan-600/20 text-cyan-400 rounded-full flex items-center justify-center p-3 shadow-lg ring-2 ring-cyan-500/50">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white">
              {profileTitle}
            </div>
            <div className="text-sm text-gray-400 font-medium">{profession}</div>
            {/* NEW: Star Rating - Placed under the profession for quick visual reputation check */}
            <div className="mt-1">
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
        
        {/* Key Attributes as Small Badges (Focus Area & Age) */}
        <div className="text-right flex flex-col space-y-1 items-end"> 
          {/* VIBRANCY EDIT 4: Changed pink to a vibrant, contrasting green-yellow */}
          <div className="flex items-center justify-end text-sm font-mono text-lime-300 px-3 py-1 rounded-full bg-lime-900/40 border border-lime-700/50 shadow-md">
            <Target className="w-3 h-3 mr-1" /> {focusArea}
          </div>
          <div className="text-xs font-mono text-gray-400 ml-auto mr-1">
            <User className="w-3 h-3 inline mr-1" /> {age} yrs old
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-4 flex-grow overflow-y-auto">

        {/* Collaboration Goal */}
        {/* VIBRANCY EDIT 5: Changed violet to electric cyan */}
        <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-700/50 shadow-inner">
            <CardHeader Icon={Target} title="Collaboration Goal" />
            <p className="text-base font-light italic text-cyan-200">"{collaborationGoal}"</p>
        </div>

        {/* Academic Interests - Uses the updated Chip component */}
        <div>
          <CardHeader Icon={Zap} title="Academic Interests" />
          <div className="flex flex-wrap gap-2 justify-center">
            {interests.map((interest, index) => (
              <Chip key={index}>{interest}</Chip>
            ))}
          </div>
        </div>

        {/* Academic Achievements */}
        <div>
          <CardHeader Icon={Star} title="Top Achievements" />
          <div className="space-y-1 text-sm text-gray-300">
            {achievements.map((achievement, index) => (
              <p key={index} className="font-medium flex items-center">
                {/* VIBRANCY EDIT 6: Changed yellow-400 to a slightly punchier gold-300 */}
                <Star className="w-3 h-3 mr-2 text-amber-300 flex-shrink-0" />
                {achievement}
              </p>
            ))}
          </div>
        </div>
        
        {/* Languages Spoken Section */}
        <div className="pt-4">
          <CardHeader Icon={Globe} title="Languages Spoken" />
          <div className="space-y-1">
            {languages.map((lang, index) => (
              <p key={index} className="text-sm font-medium text-gray-300 flex items-center">
                {/* VIBRANCY EDIT 7: Changed fuchsia-400 to electric pink-400 */}
                <MessageSquare className="w-3 h-3 mr-2 text-pink-400 flex-shrink-0" />
                {lang}
              </p>
            ))}
          </div>
        </div>
        
      </div>
      {/* Action Buttons (Moved outside StudyMatchCard) */}
    </div>
  );
};

// --- APP WRAPPER & SWIPE LOGIC ---
const MatchSwipeApp = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'like' or 'pass'

  const currentCandidate = useMemo(() => candidates[currentIndex], [candidates, currentIndex]);

  const handleSwipe = useCallback((action) => {
    setFeedback(action);
    
    // Simulate card "swipe out" delay
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < candidates.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Loop back to the first candidate for infinite testing
        setCurrentIndex(0); 
      }
    }, 400); // Animation delay
    
  }, [currentIndex, candidates.length]);

  if (candidates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="text-center p-8 rounded-lg bg-gray-800 text-gray-400">
          <p className="text-xl font-bold">No more candidates for now!</p>
          <p className="mt-2 text-sm">Check back later for new study matches.</p>
        </div>
      </div>
    );
  }

  // Determine feedback style
  const feedbackStyles = useMemo(() => {
    if (feedback === 'like') {
      return 'translate-x-full rotate-12 opacity-0 ring-green-500/50';
    }
    if (feedback === 'pass') {
      return '-translate-x-full -rotate-12 opacity-0 ring-red-500/50';
    }
    return 'translate-x-0 rotate-0 opacity-100 ring-transparent';
  }, [feedback]);

  return (
    // Changed bg-gray-900 to bg-black for better contrast with the neon glow
    <div className="min-h-screen bg-black p-4 sm:p-8 flex flex-col items-center justify-center font-inter">
      
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">
        Find Your Collaboration Match
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Swipe to find profiles that match your academic goals. All profiles are anonymous.
      </p>

      {/* Card Container with Swipe Animation */}
      <div className={`relative w-full max-w-lg card-transition ${feedbackStyles}`}>
        <StudyMatchCard candidate={currentCandidate} />
        
        {/* Swipe Feedback Overlay */}
        {feedback && (
          <div className={`absolute inset-0 flex items-center justify-center rounded-xl transition-opacity duration-300 ${feedback === 'like' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
            <span className={`text-6xl font-extrabold uppercase p-4 rounded-lg backdrop-blur-sm ${feedback === 'like' ? 'text-green-300' : 'text-red-300'} border-4 ${feedback === 'like' ? 'border-green-300' : 'border-red-300'}`}>
              {feedback === 'like' ? 'LIKE' : 'PASS'}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      {/* VIBRANCY EDIT 8: Made action buttons slightly more aggressive/flashy */}
      <div className="flex space-x-12 mt-10">
        <button
          onClick={() => handleSwipe('pass')}
          className="p-5 rounded-full bg-red-900 hover:bg-red-800 text-white shadow-2xl transition duration-200 transform hover:scale-110 active:scale-95 ring-4 ring-red-500/50 border border-red-700"
          aria-label="Pass on this profile"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe('like')}
          className="p-5 rounded-full bg-green-900 hover:bg-green-800 text-white shadow-2xl transition duration-200 transform hover:scale-110 active:scale-95 ring-4 ring-green-500/50 border border-green-700"
          aria-label="Like this profile"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>

      {/* Candidate Counter */}
      <div className="mt-6 text-sm text-gray-500">
        Profile {currentIndex + 1} of {candidates.length}
      </div>
    </div>
  );
};

export default MatchSwipeApp;