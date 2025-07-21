import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { useAppContext } from "../context/appContext";
import { Loader } from "../components/Loader";

const SignupPage = () => {
  const { setAppLoading, appLoading } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    otp: "",
  });
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (isSendOtp) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.otp) newErrors.otp = "OTP is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSentOtp = async () => {
    if (!validateForm()) return;

    setAppLoading(true);
    try {
      const resp = await axiosInstance.post("/auth/send-otp", {
        email: formData.email,
      });
      if (resp.data.isSuccess) {
        SuccessToast("OTP sent successfully!");
        setIsSendOtp(true);
      } else {
        ErrorToast(resp.data.message || "Failed to send OTP");
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Error sending OTP");
    } finally {
      setAppLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setAppLoading(true);
    try {
      const resp = await axiosInstance.post("/auth/signup", formData);
      if (resp.status === 201) {
        SuccessToast("Registration successful!");
        navigate("/login");
      } else {
        ErrorToast(resp.data.message || "Registration failed");
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Error during registration");
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
              Join FreelanceHub
            </h2>
            <p className="text-blue-200 mt-1">
              {isSendOtp ? "Complete your registration" : "Create your account"}
            </p>
          </div>

          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-blue-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border ${
                  errors.name ? "border-red-500" : "border-blue-800/50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50`}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Role Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-blue-300">
                I want to join as
              </label>
              <select
                name="role"
                className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border ${
                  errors.role ? "border-red-500" : "border-blue-800/50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" className="text-blue-400/50">
                  Select your role
                </option>
                <option value="freelancer" className="text-blue-100">
                  Freelancer
                </option>
                <option value="client" className="text-blue-100">
                  Client
                </option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-blue-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border ${
                  errors.email ? "border-red-500" : "border-blue-800/50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50`}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Conditional Password and OTP Fields */}
            {isSendOtp && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-blue-300">
                    Create Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border ${
                      errors.password ? "border-red-500" : "border-blue-800/50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-blue-300">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-blue-100 border ${
                      errors.otp ? "border-red-500" : "border-blue-800/50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400/50`}
                    placeholder="123456"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                  {errors.otp && (
                    <p className="text-red-400 text-xs mt-1">{errors.otp}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={isSendOtp ? handleRegister : handleSentOtp}
              disabled={appLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.01] active:scale-95 ${
                appLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSendOtp ? "Create Account" : "Send Verification OTP"}
            </button>

            {/* Redirect to Login */}
            <p className="text-sm text-center text-blue-300 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
      {appLoading && <Loader />}
    </div>
  );
};

export { SignupPage };
