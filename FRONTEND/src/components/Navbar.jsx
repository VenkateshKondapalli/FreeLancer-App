import { Link } from "react-router";
import { useAppContext } from "../context/appContext";
import { axiosInstance } from "../axios/axiosInstance";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-red-300 flex justify-between items-center p-4 shadow-md rounded-b-lg">
      {/* Logo */}
      <div>
        <Link to="/" className="text-xl font-bold text-white hover:underline">
          MY App
        </Link>
      </div>

      {/* Right Side (Auth buttons or Logout + Profile Icon) */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/signup"
              className="text-white font-medium hover:text-red-100 transition"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-white font-medium hover:text-red-100 transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-white text-red-500 font-semibold px-4 py-1 rounded hover:bg-red-100 transition"
            >
              Logout
            </button>
            {/* Profile Icon shown only when logged in */}
            <div className="h-9 w-9 rounded-full bg-violet-800 border-2 border-white shadow-md"></div>
          </>
        )}
      </div>
    </header>
  );
};

export { Navbar };
