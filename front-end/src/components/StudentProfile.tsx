"use client";

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Sparkles, Target, TrendingDown, BookOpen, Trash2, Check,
  Cake, School, Trophy, Languages, Lightbulb, User,
  Timer, Briefcase, Award, Star // <-- New icons for teaching section
} from 'lucide-react';
import "../app/globals.css"; // Assuming this path is correct for your project
import { useProfile } from '../app/context/ProfileContext'; // <-- IMPORT YOUR HOOK

// Constants and Styles for the component
const SUBJECT_SUGGESTIONS = [
  "Algorithms", "Data Structures", "Calculus", "Linear Algebra", "Statistics",
  "Organic Chemistry", "Mechanics", "Electromagnetism", "Biochemistry", "Machine Learning",
];

// All your animation styles
const componentStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes pop-in {
    0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
    50% { transform: scale(1.05) rotate(2deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes shine {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pop-in {
    animation: pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }

  .bg-gradient-animated {
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
  }

  .shine-effect {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    background-size: 200% 100%;
    animation: shine 2s infinite;
  }

  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .glow-on-hover {
    position: relative;
    overflow: hidden;
  }

  .glow-on-hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .glow-on-hover:hover::before {
    left: 100%;
  }
`;

export default function StudentProfile() {
  // Get EVERYTHING from the context
  const {
    occupation, setOccupation,
    sex, setSex,
    strongPoints, setStrongPoints,
    weakPoints, setWeakPoints,
    subjects,
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
    awards,
    awardInput, setAwardInput,
    languages,
    languageInput, setLanguageInput,
    handleAddAward,
    handleRemoveAward,
    handleAddLanguage,
    handleRemoveLanguage,

    currentUser,

    // New Teaching State
    availableHours, setAvailableHours,
    experience, setExperience,
    yearsTeaching, setYearsTeaching,
    teachingCertificates,
    certificateInput, setCertificateInput,
    handleAddCertificate,
    handleRemoveCertificate
    
  } = useProfile(); // <-- All logic comes from here

  // This simple UI-only state can stay here
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{componentStyles}</style>

      <div className="min-h-screen bg-purple-50 text-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Floating Header */}
          <div className={`text-center mb-12 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-block animate-float mb-4">
              <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <GraduationCap className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-black mb-3">
              Student Profile
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              {currentUser 
                ? `Editing profile for: ${currentUser.username}` 
                : "Loading profile..."}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 max-w-3xl mx-auto bg-purple-100 border border-purple-300 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                <span className="text-sm font-bold text-gray-700">Profile Completion</span>
              </div>
              <span className="text-2xl font-black text-purple-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-2 bg-white border border-purple-300 rounded-3xl shadow-2xl p-8 card-hover">
              <div className="space-y-8">
                
                {/* --- Personal Information Section --- */}
                <h3 className="text-2xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2">
                  Personal Info
                </h3>
                
                {/* Occupation */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">💼</span>
                    </div>
                    <span>Main Occupation <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    value={occupation} 
                    onChange={(e) => setOccupation(e.target.value)}
                    className={`w-full p-4 rounded-xl border-2 text-base font-medium transition-all duration-300
                                bg-white shadow-md
                                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600 focus:scale-[1.02]
                                ${errors.occupation ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  >
                    <option value="">✨ Choose your field</option>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Economics</option>
                    <option>Psychology</option>
                    <option>Engineering</option>
                    <option>Other</option>
                  </select>
                  {errors.occupation && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.occupation}</p>}
                </div>

                {/* Sex Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">👤</span>
                    </div>
                    <span>Sex <span className="text-red-500">*</span></span>
                  </label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-3 cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 card-hover
                        ${sex === "Male" 
                          ? "border-purple-600 bg-purple-100 shadow-xl ring-4 ring-purple-300" 
                          : errors.sex 
                            ? "border-red-400 bg-red-50" 
                            : "border-gray-300 bg-white hover:border-purple-400 hover:shadow-lg"}`}>
                      <input
                        type="radio" name="sex" value="Male"
                        checked={sex === "Male"} 
                        onChange={(e) => setSex(e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      /> 
                      <span className="font-bold text-lg text-gray-700">Male</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-3 cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 card-hover
                        ${sex === "Female" 
                          ? "border-purple-600 bg-purple-100 shadow-xl ring-4 ring-purple-300" 
                          : errors.sex 
                            ? "border-red-400 bg-red-50" 
                            : "border-gray-300 bg-white hover:border-purple-400 hover:shadow-lg"}`}>
                      <input
                        type="radio" name="sex" value="Female"
                        checked={sex === "Female"} 
                        onChange={(e) => setSex(e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      /> 
                      <span className="font-bold text-lg text-gray-700">Female</span>
                    </label>
                  </div>
                  {errors.sex && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.sex}</p>}
                </div>

                {/* Date of Birth */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <Cake size={20} className="text-purple-600" />
                    </div>
                    <span>Date of Birth <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`w-full p-4 rounded-xl border-2 text-base font-medium transition-all duration-300
                                bg-white shadow-md
                                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600 focus:scale-[1.02]
                                ${errors.dob ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  />
                  {errors.dob && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.dob}</p>}
                </div>

                {/* University */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <School size={20} className="text-purple-600" />
                    </div>
                    <span>University <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g., Stanford University"
                    className={`w-full p-4 rounded-xl border-2 text-base font-medium transition-all duration-300
                                bg-white shadow-md
                                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600 focus:scale-[1.02]
                                ${errors.university ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  />
                  {errors.university && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.university}</p>}
                </div>

                {/* --- Academic & Skills Section --- */}
                <h3 className="text-2xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2 pt-4">
                  Academic & Skills
                </h3>

                {/* Strong Points */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <Target size={20} className="text-purple-600" />
                    </div>
                    <span>Strong Points <span className="text-red-500">*</span></span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={strongPoints} 
                      onChange={(e) => setStrongPoints(e.target.value)} 
                      maxLength={500}
                      rows={4}
                      placeholder="✨ What are you great at? e.g., problem solving, Java, calculus..."
                      className={`w-full p-4 rounded-xl border-2 text-base transition-all duration-300
                                  bg-white shadow-md font-medium
                                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600 focus:scale-[1.02]
                                  ${errors.strong ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full shadow">
                      {strongPoints.length}/500
                    </div>
                  </div>
                  {errors.strong && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.strong}</p>}
                </div>

                {/* Weak Points */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingDown size={20} className="text-purple-600" />
                    </div>
                    <span>Weak Points <span className="text-red-500">*</span></span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={weakPoints} 
                      onChange={(e) => setWeakPoints(e.target.value)} 
                      maxLength={500}
                      rows={4}
                      placeholder="📝 Areas to improve? e.g., public speaking, proofs..."
                      className={`w-full p-4 rounded-xl border-2 text-base transition-all duration-300
                                  bg-white shadow-md font-medium
                                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600 focus:scale-[1.02]
                                  ${errors.weak ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full shadow">
                      {weakPoints.length}/500
                    </div>
                  </div>
                  {errors.weak && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.weak}</p>}
                </div>

                {/* Subjects */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen size={20} className="text-purple-600" />
                    </div>
                    <span>Subjects You Want to Learn <span className="text-red-500">*</span></span>
                  </label>
                  
                  {subjects.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-purple-100 rounded-xl border-2 border-purple-200 shadow-inner">
                      {subjects.map((s) => (
                        <div
                          key={s}
                          className="animate-pop-in inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg card-hover font-semibold"
                        >
                          <span>{s}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSubject(s)} 
                            className="bg-purple-800 hover:bg-purple-700 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <input
                      value={subjectInput} 
                      onChange={(e) => setSubjectInput(e.target.value)} 
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddSubject(); } }}
                      placeholder="Type a subject..."
                      className={`flex-1 p-4 rounded-xl border-2 text-base transition-all duration-300
                                  bg-white shadow-md font-medium
                                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                  ${errors.subjects && subjects.length === 0 ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject} 
                      className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg
                                 hover:bg-purple-700 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-600 flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-600" />
                      Quick suggestions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECT_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleAddSuggestion(s)} 
                          disabled={subjects.includes(s)}
                          className="px-4 py-2 rounded-full border-2 border-purple-300 bg-purple-50 text-purple-700 font-semibold text-sm
                                     hover:bg-purple-100 hover:border-purple-400 hover:shadow-md transform transition-all duration-200 hover:scale-105
                                     disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.subjects && <p className="text-red-600 text-sm font-semibold animate-slide-up flex items-center gap-1">⚠️ {errors.subjects}</p>}
                </div>

                {/* Awards & Certifications */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy size={20} className="text-purple-600" />
                    </div>
                    <span>Awards & Certifications (Optional)</span>
                  </label>
                  
                  {awards.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-purple-100 rounded-xl border-2 border-purple-200 shadow-inner">
                      {awards.map((award) => (
                        <div
                          key={award}
                          className="animate-pop-in inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg card-hover font-semibold"
                        >
                          <span>{award}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAward(award)} 
                            className="bg-purple-800 hover:bg-purple-700 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <input
                      value={awardInput} 
                      onChange={(e) => setAwardInput(e.target.value)} 
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddAward(); } }}
                      placeholder="e.g., ACM ICPC Finalist, AWS Certified"
                      className={`flex-1 p-4 rounded-xl border-2 text-base transition-all duration-300
                                  bg-white shadow-md font-medium
                                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                  border-gray-300`}
                    />
                    <button
                      type="button"
                      onClick={handleAddAward} 
                      className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg
                                 hover:bg-purple-700 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                      <Languages size={20} className="text-purple-600" />
                    </div>
                    <span>Languages (Optional)</span>
                  </label>
                  
                  {languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-purple-100 rounded-xl border-2 border-purple-200 shadow-inner">
                      {languages.map((lang) => (
                        <div
                          key={lang}
                          className="animate-pop-in inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg card-hover font-semibold"
                        >
                          <span>{lang}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang)} 
                            className="bg-purple-800 hover:bg-purple-700 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <input
                      value={languageInput} 
                      onChange={(e) => setLanguageInput(e.target.value)} 
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddLanguage(); } }}
                      placeholder="e.g., English, Spanish, French"
                      className={`flex-1 p-4 rounded-xl border-2 text-base transition-all duration-300
                                  bg-white shadow-md font-medium
                                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                  border-gray-300`}
                    />
                    <button
                      type="button"
                      onClick={handleAddLanguage} 
                      className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg
                                 hover:bg-purple-700 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>


                {/* --- NEW: Teaching Section --- */}
                <h3 className="text-2xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2 pt-4">
                  Teaching Profile (Optional)
                </h3>
                
                {/* Wants to Teach Checkbox */}
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 card-hover
                                ${wantsToTeach 
                                  ? "border-purple-600 bg-purple-100 shadow-xl ring-4 ring-purple-300" 
                                  : "border-gray-300 bg-white hover:border-purple-400 hover:shadow-lg"}`}>
                    <input
                      type="checkbox"
                      checked={wantsToTeach}
                      onChange={(e) => setWantsToTeach(e.target.checked)}
                      className="w-6 h-6 text-purple-600 focus:ring-purple-500 rounded"
                    /> 
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-gray-700">I am interested in teaching/tutoring other students</span>
                      <span className="text-sm text-gray-600">Check this box to show your teaching profile to others.</span>
                    </div>
                  </label>
                </div>

                {/* --- CONDITIONAL: Teaching Details --- */}
                {wantsToTeach && (
                  <div className="animate-slide-up space-y-8 p-6 bg-purple-100/50 rounded-2xl border-2 border-purple-200">
                    <h4 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                      <Lightbulb size={24} />
                      My Teaching Details
                    </h4>

                    {/* Available Hours */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                          <Timer size={20} className="text-purple-600" />
                        </div>
                        <span>Available Hours (Optional)</span>
                      </label>
                      <textarea
                        value={availableHours} 
                        onChange={(e) => setAvailableHours(e.target.value)}
                        rows={3}
                        placeholder="e.g., Weekday evenings, Sunday afternoons"
                        className={`w-full p-4 rounded-xl border-2 text-base transition-all duration-300
                                    bg-white shadow-md font-medium
                                    focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                    border-gray-300`}
                      ></textarea>
                    </div>
                    
                    {/* Experience */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                          <Briefcase size={20} className="text-purple-600" />
                        </div>
                        <span>Teaching Experience (Optional)</span>
                      </label>
                      <textarea
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)}
                        rows={4}
                        placeholder="e.g., 2 years as a TA for CS101, tutored high school math..."
                        className={`w-full p-4 rounded-xl border-2 text-base transition-all duration-300
                                    bg-white shadow-md font-medium
                                    focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                    border-gray-300`}
                      ></textarea>
                    </div>

                    {/* Years Teaching */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                          <Star size={20} className="text-purple-600" />
                        </div>
                        <span>Years of Experience (Optional)</span>
                      </label>
                      <input
                        type="number"
                        value={yearsTeaching} 
                        onChange={(e) => setYearsTeaching(e.target.value)}
                        placeholder="e.g., 3"
                        min="0"
                        className={`w-full p-4 rounded-xl border-2 text-base transition-all duration-300
                                    bg-white shadow-md font-medium
                                    focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                    border-gray-300`}
                      />
                    </div>

                    {/* Teaching Certificates */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                          <Award size={20} className="text-purple-600" />
                        </div>
                        <span>Teaching Certificates (Optional)</span>
                      </label>
                      
                      {teachingCertificates.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-4 bg-white rounded-xl border-2 border-purple-200 shadow-inner">
                          {teachingCertificates.map((cert) => (
                            <div
                              key={cert}
                              className="animate-pop-in inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg card-hover font-semibold"
                            >
                              <span>{cert}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCertificate(cert)} 
                                className="bg-purple-800 hover:bg-purple-700 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 hover:scale-110"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <input
                          value={certificateInput} 
                          onChange={(e) => setCertificateInput(e.target.value)} 
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCertificate(); } }}
                          placeholder="e.g., TESOL, University Teaching Cert."
                          className={`flex-1 p-4 rounded-xl border-2 text-base transition-all duration-300
                                      bg-white shadow-md font-medium
                                      focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-600
                                      border-gray-300`}
                        />
                        <button
                          type="button"
                          onClick={handleAddCertificate} 
                          className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg
                                     hover:bg-purple-700 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                  </div>
                )}
                {/* --- END CONDITIONAL SECTION --- */}


                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-purple-600 text-white font-black text-lg shadow-2xl
                               hover:bg-purple-700 hover:shadow-3xl transform transition-all duration-300 hover:scale-105 active:scale-95
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={24} />
                        Save Profile
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset} 
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border-2 border-gray-400 bg-white text-black font-bold shadow-lg
                               hover:bg-gray-100 hover:border-gray-500 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Trash2 size={20} />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-white border border-purple-300 rounded-3xl shadow-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <h2 className="text-2xl font-black text-purple-700">
                    Live Preview
                  </h2>
                </div>

                <div className="space-y-3">

                  {/* Account */}
                  {currentUser && (
                    <div className="bg-purple-100 rounded-2xl p-4 border-2 border-purple-300 shadow-lg card-hover">
                      <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                        <User size={14} /> Account
                      </p>
                      <p className="font-bold text-gray-800">{currentUser.username}</p>
                      <p className="text-sm text-gray-600">{currentUser.email}</p>
                    </div>
                  )}

                  {/* Occupation */}
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <span>💼</span> Occupation
                    </p>
                    <p className="font-bold text-gray-800">{occupation || <span className="text-gray-400 italic">Not set</span>}</p>
                  </div>

                  {/* Sex */}
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <span>👤</span> Sex
                    </p>
                    <p className="font-bold text-gray-800">{sex || <span className="text-gray-400 italic">Not set</span>}</p>
                  </div>

                  {/* DOB */}
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <Cake size={14} /> Date of Birth
                    </p>
                    <p className="font-bold text-gray-800">{dob || <span className="text-gray-400 italic">Not set</span>}</p>
                  </div>

                  {/* University */}
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <School size={14} /> University
                    </p>
                    <p className="font-bold text-gray-800">{university || <span className="text-gray-400 italic">Not set</span>}</p>
                  </div>

                  {/* --- CONDITIONAL PREVIEW: Teaching --- */}
                  {wantsToTeach && (
                    <>
                      <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                        <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                          <Lightbulb size={14} /> Teaching
                        </p>
                        <p className="font-bold text-gray-800">Interested in teaching</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                        <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                          <Timer size={14} /> Available Hours
                        </p>
                        <p className="text-sm text-gray-800 leading-relaxed line-clamp-3 font-medium">
                          {availableHours || <span className="text-gray-400 italic">Not set</span>}
                        </p>
                      </div>

                      <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                        <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                          <Star size={14} /> Years of Experience
                        </p>
                        <p className="font-bold text-gray-800">
                          {yearsTeaching ? `${yearsTeaching} years` : <span className="text-gray-400 italic">Not set</span>}
                        </p>
                      </div>
                    </>
                  )}
                  {/* --- END CONDITIONAL PREVIEW --- */}


                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <Target size={14} /> Strong Points
                    </p>
                    <p className="text-sm text-gray-800 leading-relaxed line-clamp-3 font-medium">
                      {strongPoints || <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <TrendingDown size={14} /> Weak Points
                    </p>
                    <p className="text-sm text-gray-800 leading-relaxed line-clamp-3 font-medium">
                      {weakPoints || <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <BookOpen size={14} /> Subjects ({subjects.length})
                    </p>
                    {subjects.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s) => (
                          <span key={s} className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-sm font-medium">No subjects added</p>
                    )}
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <Trophy size={14} /> Awards ({awards.length})
                    </p>
                    {awards.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {awards.map((award) => (
                          <span key={award} className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                            {award}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-sm font-medium">No awards added</p>
                    )}
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                    <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                      <Languages size={14} /> Languages ({languages.length})
                    </p>
                    {languages.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <span key={lang} className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                            {lang}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-sm font-medium">No languages added</p>
                    )}
                  </div>
                  
                  {/* --- CONDITIONAL PREVIEW: Certificates --- */}
                  {wantsToTeach && teachingCertificates.length > 0 && (
                    <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg card-hover">
                      <p className="text-xs font-black text-purple-600 uppercase mb-2 flex items-center gap-2">
                        <Award size={14} /> Teaching Certificates ({teachingCertificates.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {teachingCertificates.map((cert) => (
                          <span key={cert} className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* --- END CONDITIONAL PREVIEW --- */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-8 right-8 bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-pop-in flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center">
            <Check size={20} />
          </div>
          <span className="font-bold text-lg">Profile saved successfully!</span>
        </div>
      )}
    </>
  );
}