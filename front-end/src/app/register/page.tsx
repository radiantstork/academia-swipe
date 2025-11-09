"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserPlus, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

// Types
interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
}

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  shake?: boolean;
}

// Simulated database using React state (mimics file storage)
const useDatabase = () => {
  const [users, setUsers] = useState<UserData[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("users_db");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem("users_db", JSON.stringify(users));
  }, [users]);

  const saveUser = (userData: UserData) => {
    const newUsers = [...users, { ...userData }];
    setUsers(newUsers);
  };

  const userExists = (email: string, username: string) => {
    return users.some((u: UserData) => u.email === email || u.username === username);
  };

  return { saveUser, userExists };
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
    box-shadow: 0 8px 16px rgba(139, 92, 246, 0.2);
  }
`;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveUser, userExists } = useDatabase();

  const validate = () => {
    const newErrors: RegisterErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (userExists(email, username)) {
      newErrors.email = "Email or username already exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setErrors((prev) => ({ ...prev, shake: true }));
      setTimeout(() => setErrors((prev) => ({ ...prev, shake: false })), 500);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      saveUser({ username, email, password, createdAt: new Date().toISOString(), id: Date.now().toString() });
      login({ username, email, password: password});
      setIsSubmitting(false);
      router.push("/profile");
    }, 1000);
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 bg-gradient-animated py-12 px-4 flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <div className="animate-fadeIn glass rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl mb-4">
                <UserPlus className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-gray-800 font-medium">Join us and start your journey</p>
            </div>
            <div className={`space-y-5 ${errors.shake ? "animate-shake" : ""}`}>
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <User size={16} className="text-violet-600" />
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                    ${errors.username ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/80"}
                    focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-500`}
                />
                {errors.username && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1 animate-slideIn">
                    <AlertCircle size={14} /> {errors.username}
                  </p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Mail size={16} className="text-violet-600" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                    ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/80"}
                    focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-500`}
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
                  <Lock size={16} className="text-violet-600" />
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
                      focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-500`}
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
              {/* Confirm Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Shield size={16} className="text-violet-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus pr-12 text-black
                      ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/80"}
                      focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1 animate-slideIn">
                    <AlertCircle size={14} /> {errors.confirmPassword}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-lg
                  hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform transition-all duration-300 
                  hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>
              {/* Switch to Login */}
              <p className="text-center text-gray-800 text-sm mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-violet-600 font-bold hover:text-violet-700 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}