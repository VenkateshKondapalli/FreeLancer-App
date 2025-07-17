import { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Navbar } from "../components/navbar";
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
        window.open("/", "_self");
      } else {
        ErrorToast(resp.data.message);
      }
    } catch (err) {
      ErrorToast(`Cannot login: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-20">
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md space-y-5 mt-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            LOGIN
          </h2>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold rounded-lg transition duration-200"
              onClick={handleRegister}
            >
              Login
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Register For Account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
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
