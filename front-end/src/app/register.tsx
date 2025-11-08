"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { User, Mail, Lock, LogIn, UserPlus, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import "../app/globals.css"; // Assuming this is the correct path

// Types
interface UserData {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
}

interface CurrentUser {
  username: string;
  email: string;
}

// Specific Error types for our forms
interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  shake?: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Simulated database using React state (mimics file storage)
const useDatabase = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage *once* on mount (client-side)
  useEffect(() => {
    const stored = localStorage.getItem('users_db');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
    setIsLoaded(true); 
  }, []);

  // Save data *back* to localStorage whenever 'users' changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('users_db', JSON.stringify(users));
    }
  }, [users, isLoaded]);

  const saveUser = (userData: Omit<UserData, 'id'>) => {
    const newUsers = [...users, { ...userData, id: Date.now() }];
    setUsers(newUsers);
  };

  const findUser = (email: string, password: string) => {
    return users.find((u: UserData) => u.email === email && u.password === password);
  };

  const userExists = (email: string, username: string) => {
    return users.some((u: UserData) => u.email === email || u.username === username);
  };

  return { saveUser, findUser, userExists, users };
};

// Your custom animation styles
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

function RegisterPage({ onRegisterSuccess, onSwitchToLogin }: { 
  onRegisterSuccess: () => void; 
  onSwitchToLogin: () => void;
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveUser, userExists } = useDatabase();

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (userExists(email, username)) {
      newErrors.email = 'Email or username already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setErrors(prev => ({ ...prev, shake: true }));
      setTimeout(() => setErrors(prev => ({ ...prev, shake: false })), 500);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      saveUser({ username, email, password, createdAt: new Date().toISOString() });
      localStorage.setItem('currentUser', JSON.stringify({ username, email }));
      setIsSubmitting(false);
      onRegisterSuccess(); // This will trigger the redirect
    }, 1000);
  };

  return (
    <div className="animate-fadeIn glass rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl mb-4">
          <UserPlus className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Create Account
        </h2>
        {/* MODIFIED: text-gray-600 to text-gray-800 */}
        <p className="text-gray-800 font-medium">Join us and start your journey</p>
      </div>

      <div className={`space-y-5 ${errors.shake ? 'animate-shake' : ''}`}>
        {/* Username */}
        <div>
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
            <User size={16} className="text-violet-600" />
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            // MODIFIED: Added text-black
            className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                        ${errors.username ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
            <Mail size={16} className="text-violet-600" />
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            // MODIFIED: Added text-black
            className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                        ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
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
              // MODIFIED: Added text-black
              className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus pr-12 text-black
                          ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
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
              // MODIFIED: Added text-black
              className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus pr-12 text-black
                          ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
        {/* MODIFIED: text-gray-600 to text-gray-800 */}
        <p className="text-center text-gray-800 text-sm mt-4">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-violet-600 font-bold hover:text-violet-700 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

function LoginPage({ onLoginSuccess, onSwitchToRegister }: {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { findUser } = useDatabase();

  const handleSubmit = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const user = findUser(email, password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
        setIsSubmitting(false);
        onLoginSuccess(); // This will trigger the redirect
      } else {
        setErrors({ general: 'Invalid email or password' });
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="animate-fadeIn glass rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl mb-4">
          <LogIn className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        {/* MODIFIED: text-gray-600 to text-gray-800 */}
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
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
            <Mail size={16} className="text-blue-600" />
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            // MODIFIED: Added text-black
            className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus text-black
                        ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
          {/* MODIFIED: text-gray-700 to text-gray-900 */}
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
              // MODIFIED: Added text-black
              className={`w-full px-4 py-3 rounded-xl border-2 font-medium input-focus pr-12 text-black
                          ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white/80'}
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
          className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold text-lg
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
        {/* MODIFIED: text-gray-600 to text-gray-800 */}
        <p className="text-center text-gray-800 text-sm mt-4">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 font-bold hover:text-blue-700 hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}


// This is the main component you export
export default function AuthSystem() {
  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState('register'); // Defaults to 'register'
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []); // Empty array ensures this runs once

  const handleRegisterSuccess = () => {
    router.push('/profile'); // Redirect on success
  };

  const handleLoginSuccess = () => {
    router.push('/profile'); // Redirect on success
  };

  if (!isClient) {
    return null; // or return a loading spinner
  }

  return (
    <>
      <style>{componentStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 bg-gradient-animated py-12 px-4 flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          {currentPage === 'register' && (
            <RegisterPage
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setCurrentPage('login')}
            />
          )}

          {currentPage === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setCurrentPage('register')}
            />
          )}
        </div>
      </div>
    </>
  );
}