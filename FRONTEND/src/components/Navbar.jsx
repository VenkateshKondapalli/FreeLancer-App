import { Link, useNavigate } from "react-router";
import { useAppContext } from "../context/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user = {} } = useAppContext();
  const { isAuthenticated, imageUrl, role } = user;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full ${
        scrolled
          ? "bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg py-2"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md py-4"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transform transition duration-300 flex items-center"
            >
              <span className="mr-2">💼</span>
              FreelanceHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <Link
                  to="/home"
                  className="text-white font-medium hover:text-indigo-100 transition duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="text-white font-medium hover:text-indigo-100 transition duration-200"
                >
                  Projects
                </Link>
                <Link
                  to="/messages"
                  className="text-white font-medium hover:text-indigo-100 transition duration-200"
                >
                  Messages
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="hidden sm:block text-white font-medium hover:text-indigo-100 transition duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="hidden sm:block bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 transition duration-300"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-white font-medium capitalize">
                    {role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 transition duration-300"
                  >
                    Logout
                  </button>
                  <div
                    onClick={() => navigate("/profile")}
                    className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-inner hover:scale-105 transition overflow-hidden"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-indigo-600 font-bold">👤</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-indigo-700 mt-2 rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/home"
                    className="text-white font-medium hover:bg-indigo-600 px-3 py-2 rounded transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/projects"
                    className="text-white font-medium hover:bg-indigo-600 px-3 py-2 rounded transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/messages"
                    className="text-white font-medium hover:bg-indigo-600 px-3 py-2 rounded transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Messages
                  </Link>
                  <div className="pt-2 border-t border-indigo-500">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="text-white font-medium hover:bg-indigo-600 px-3 py-2 rounded transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-center bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export { Navbar };
