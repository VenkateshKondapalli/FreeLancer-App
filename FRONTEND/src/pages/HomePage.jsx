import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { useAppContext } from "../context/appContext";

const HomePage = () => {
  const user = useAppContext();
  console.log(user);
  const { role } = user.user;
  const isFreelancer = role === "freelancer";
  const isClient = role === "client";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Navbar />

      <div className="flex flex-col items-center px-6 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          You're logged in as{" "}
          <span className="font-semibold text-blue-600">
            {user?.role || "Guest"}
          </span>
        </p>

        {isFreelancer && (
          <section className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl mb-6 hover:shadow-2xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">
              Freelancer Toolkit
            </h2>
            <ul className="list-disc pl-6 text-left text-gray-700 space-y-2">
              <li>Browse job opportunities</li>
              <li>Update your freelancer profile</li>
              <li>Tips for writing standout proposals</li>
            </ul>
          </section>
        )}

        {isClient && (
          <section className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl mb-6 hover:shadow-2xl transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Client Toolkit
            </h2>
            <ul className="list-disc pl-6 text-left text-gray-700 space-y-2">
              <li>Post new projects easily</li>
              <li>Find qualified freelancers</li>
              <li>Review & manage proposals</li>
            </ul>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-10">
          <Link
            to="/profile"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition font-medium"
          >
            View Profile
          </Link>
          <Link
            to={isFreelancer ? "/jobs" : "/freelancers"}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition font-medium"
          >
            {isFreelancer ? "Explore Jobs" : "Find Freelancers"}
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl text-center hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-bold mb-2 text-indigo-700">
            ✨ Coming Soon
          </h3>
          <p className="text-gray-600">
            Stay tuned for articles, productivity tips, and platform updates to
            boost your success!
          </p>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
