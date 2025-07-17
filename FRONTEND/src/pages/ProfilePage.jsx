import { ClientProfileContainer } from "../components/ClientProfileContainer";
import { FreelancerProfileContainer } from "../components/FreelancerProfileContainer";
import { Navbar } from "../components/Navbar";
import { useAppContext } from "../context/appContext";

const ProfilePage = () => {
  const user = useAppContext();
  const { email, role } = user?.user || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="mb-6 bg-white p-4 rounded shadow space-y-2">
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile Icon"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              defaultValue={email}
              type="text"
              id="email"
              name="email"
              className="py-2 px-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed text-gray-600"
              disabled
            />
          </div>
          <p className="inline-block px-3 py-1 text-sm rounded bg-lime-200 text-gray-800 border border-gray-300 w-fit">
            {role}
          </p>
        </div>

        {role === "freelancer" && <FreelancerProfileContainer />}
        {role === "client" && <ClientProfileContainer />}
      </div>
    </div>
  );
};

export { ProfilePage };
