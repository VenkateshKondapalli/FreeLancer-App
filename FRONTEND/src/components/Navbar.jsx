import { Link, useNavigate } from "react-router";
import { useAppContext } from "../context/appContext";
import { axiosInstance } from "../axios/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const { user = {} } = useAppContext();
  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-gradient-to-r from-red-400 to-red-600 p-4 shadow-lg rounded-b-xl flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link
          to={isAuthenticated ? "/home" : "/"}
          className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transform transition duration-300"
        >
          FreelanceHub
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/signup"
              className="text-white font-medium hover:underline underline-offset-2 transition duration-200"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-white font-medium hover:underline underline-offset-2 transition duration-200"
            >
              Log In
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-red-50 transition duration-300"
            >
              Logout
            </button>
            <div
              onClick={() => navigate("/profile")}
              className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-inner hover:scale-105 transition"
            >
              <span className="text-red-600 font-bold">👤</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export { Navbar };
