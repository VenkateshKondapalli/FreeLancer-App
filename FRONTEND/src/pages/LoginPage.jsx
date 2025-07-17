import { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Navbar } from "../components/Navbar";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { Link } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        ErrorToast("Email and Password is Required");
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
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-200 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 pt-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500">
            Please login to your FreelanceHub account
          </p>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>

          {/* Link to Signup */}
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
