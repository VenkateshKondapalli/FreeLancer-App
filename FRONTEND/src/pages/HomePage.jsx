import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { user } = useAppContext();
  const [greeting, setGreeting] = useState("");
  const { role, name } = user?.user || {};
  const isFreelancer = role === "freelancer";
  const isClient = role === "client";

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <div className="pt-20 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">
            {greeting}, {name || "User"} 👋
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            You're logged in as{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {role || "Guest"}
            </span>
          </p>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md w-40 hover:shadow-lg transition">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                12
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Active Projects
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md w-40 hover:shadow-lg transition">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                4.9
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Avg Rating
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md w-40 hover:shadow-lg transition">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Success Rate
              </div>
            </div>
          </div>
        </div>

        {/* Role-Specific Dashboard */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {isFreelancer && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  Freelancer Dashboard
                </h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Browse job opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Update your freelancer profile
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Tips for writing standout proposals
                  </span>
                </li>
              </ul>
            </div>
          )}

          {isClient && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  Client Dashboard
                </h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Post new projects easily
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Find qualified freelancers
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Review & manage proposals
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/profile"
                className="bg-indigo-100 dark:bg-indigo-900/20 p-4 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition flex flex-col items-center"
              >
                <svg
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Profile
                </span>
              </Link>
              <Link
                to={isFreelancer ? "/jobs" : "/freelancers"}
                className="bg-emerald-100 dark:bg-emerald-900/20 p-4 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-800 transition flex flex-col items-center"
              >
                <svg
                  className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {isFreelancer ? "Find Jobs" : "Find Talent"}
                </span>
              </Link>
              <Link
                to="/messages"
                className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition flex flex-col items-center"
              >
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Messages
                </span>
              </Link>
              <Link
                to="/settings"
                className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800 transition flex flex-col items-center"
              >
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Settings
                </span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-4">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    New project posted in your category
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-4">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    Your proposal was accepted
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto text-center hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700">
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-400">
            ✨ Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stay tuned for articles, productivity tips, and platform updates to
            boost your success!
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
