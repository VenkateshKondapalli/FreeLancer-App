import { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Navbar } from "../components/Navbar";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { Link } from "react-router";
import { useAppContext } from "../context/appContext";
import { Loader } from "../components/Loader";

const LoginPage = () => {
  const { setAppLoading, appLoading } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setAppLoading(true);
      if (!email || !password) {
        ErrorToast("Email and Password is Required");
        setAppLoading(false);
        return;
      }

      const dataObj = {
        email,
        password,
      };

      const resp = await axiosInstance.post("auth/login", dataObj);

      if (resp.status === 200) {
        SuccessToast(resp.data.message);
        window.open("/home", "_self");
      } else {
        ErrorToast(resp.data.message);
      }
    } catch (err) {
      ErrorToast(`Cannot login: ${err.response?.data?.message || err.message}`);
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 pt-10">
        <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl border border-blue-900/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-400 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-blue-200 mt-1">
              Please login to your FreelanceHub account
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleLogin}
            disabled={appLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.01] active:scale-95 ${
              appLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            Login
          </button>

          {/* Link to Signup */}
          <p className="text-sm text-center text-blue-300 pt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {appLoading && <Loader />}
    </div>
  );
};

export { LoginPage };
