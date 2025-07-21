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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (contextLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      {/* Increased padding-top from py-8 to py-12 */}
      <main className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-1 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white px-5 py-4">
            My Profile
          </h1>
          <div className="border-b border-gray-200 dark:border-gray-700"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          {!role ? (
            <div className="p-8 text-center">
              <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                User role not detected
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Please contact support if you believe this is an error
              </p>
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
