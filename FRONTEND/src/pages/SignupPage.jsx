import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendOtp, setIssendOpt] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (isSendOtp) {
      try {
        const resp = await axiosInstance.post("/auth/signup", {
          name,
          role,
          email,
          password,
          otp,
        });

        if (resp.status === 201) {
          SuccessToast(resp.data.message);
          navigate("/login");
        } else {
          ErrorToast(resp.data.message);
        }
      } catch (err) {
        ErrorToast(
          `Cannot signup: ${err.response?.data?.message || err.message}`
        );
      }
    } else {
      ErrorToast("Cannot sign without sending otp");
    }
  };

  const handleSentOtp = async () => {
    try {
      const resp = await axiosInstance.post("/auth/send-otp", { email });
      if (resp.data.isSuccess) {
        setIssendOpt(true);
      } else {
        alert("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign Up
          </h2>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Role Field */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="role"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">-- Select Role --</option>
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Conditional Password and OTP Fields */}
            {isSendOtp && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Enter the OTP"
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                onClick={isSendOtp ? handleRegister : handleSentOtp}
                className="w-full py-2 px-4 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-lg transition duration-200"
              >
                {isSendOtp ? "Register" : "Send OTP"}
              </button>
            </div>

            {/* Redirect to Login */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
