"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const useDatabase = () => {
  const [users] = useState<UserData[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("users_db");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const findUser = (email: string, password: string) => {
    return users.find((u: UserData) => u.email === email && u.password === password);
  };
  return { findUser };
};

const componentStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  @keyframes gradient-move {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
  .animate-slideIn { animation: slideIn 0.4s ease-out; }
  .animate-pulse { animation: pulse 2s ease-in-out infinite; }
  .animate-shake { animation: shake 0.5s ease-in-out; }
  .bg-gradient-animated {
    background-size: 200% 200%;
    animation: gradient-move 8s ease infinite;
  }
  .glass {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  .input-focus {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .input-focus:focus {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { findUser } = useDatabase();

  const handleSubmit = () => {
    const newErrors: LoginErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const user = findUser(email, password);
      console.log(user);
      if (user) {
        login({id: user.id, username: user.username, email: user.email, password: password });
        setIsSubmitting(false);
        router.push("/profile");
      } else {
        setErrors({ general: "Invalid email or password" });
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="min-h-screen bg-linear-to-br from-blue-100 via-cyan-50 to-blue-50 bg-gradient-animated py-12 px-4 flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <div className="animate-fadeIn glass rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl mb-4">
                <LogIn className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-black bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-800 font-medium">Sign in to continue your journey</p>
            </div>
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 text-red-700 animate-slideIn">
                <AlertCircle size={20} />
                <span className="font-semibold">{errors.general}</span>
              </div>
            )}
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Mail size={16} className="text-blue-600" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                    ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/80"}
                    focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1 animate-slideIn">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Lock size={16} className="text-blue-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus pr-12 text-black
                      ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/80"}
                      focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1 animate-slideIn">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 mt-6 rounded-xl bg-linear-to-r from-blue-500 to-cyan-600 text-white font-bold text-lg
                  hover:from-blue-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transform transition-all duration-300 
                  hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
              {/* Switch to Register */}
              <p className="text-center text-gray-800 text-sm mt-4">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
