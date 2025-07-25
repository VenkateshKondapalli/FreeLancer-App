import { useEffect, useState } from "react";
import { ClientProfileContainer } from "../components/ClientProfileContainer";
import { FreelancerProfileContainer } from "../components/FreelancerProfileContainer";
import { Navbar } from "../components/Navbar";
import { useAppContext } from "../context/appContext";
import { Loader } from "../components/Loader";

const ProfilePage = () => {
  const { user, appLoading: contextLoading } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const { role } = user || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Slightly longer delay for better perceived performance

    return () => clearTimeout(timer);
  }, []);

  if (contextLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader
            message="Preparing your profile..."
            overlayClassName="bg-gray-900/80"
            spinnerColor="indigo-500"
            textColor="blue-300"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        {/* Profile Header with Glass Morphism Effect */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-sm p-1 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="px-6 py-5">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {role === "freelancer"
                ? "Freelancer dashboard"
                : "Client profile settings"}
            </p>
          </div>
          <div className="border-b border-gray-200/70 dark:border-gray-700/70"></div>
        </div>

        {/* Main Profile Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200/60 dark:border-gray-700/60 transition-all hover:shadow-xl duration-300">
          {!role ? (
            <div className="p-10 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <svg
                  className="h-6 w-6 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                User role not detected
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Please contact our support team if you believe this is an error
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                Contact Support
              </button>
            </div>
          ) : role === "freelancer" ? (
            <FreelancerProfileContainer />
          ) : (
            <ClientProfileContainer />
          )}
        </div>
      </main>
    </div>
  );
};

export { ProfilePage };
