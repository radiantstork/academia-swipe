import Link from 'next/link';
import { Users, Globe, BookOpen, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 flex items-center">
          <div className="flex space-x-4 ml-auto">
            <Link
                href="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105"
            >
              Sign In
            </Link>
            <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-8 pt-20 pb-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-gray-900">Find the perfect study buddy</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        in minutes
      </span>
            </h1>
            <p className="text-base text-gray-600 mb-10 max-w-2xl mx-auto">
              Matching with those who share your academic interests has never been easier nor faster.
              Study together, learn faster and make friends all across the globe.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mx-auto px-6 py-15">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold text-indigo-600">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentication</h3>
              <p className="text-gray-600">Register or Sign in</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold text-purple-600">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Configure Profile</h3>
              <p className="text-gray-600">
                Set interests & goals
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold text-pink-600">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swipe and Match</h3>
              <p className="text-gray-600">
                Find collaborators
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold text-indigo-400">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Communication</h3>
              <p className="text-gray-600">
                Chat with your people
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">StudyMatch</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 StudyMatch. Made with 💜 for students everywhere.
            </div>
          </div>
        </footer>
      </div>
  );
}