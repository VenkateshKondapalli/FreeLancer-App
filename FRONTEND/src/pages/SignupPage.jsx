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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-10 px-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Join FreelanceHub</h2>
            <p className="text-blue-200 mt-2">
              {isSendOtp ? "Complete your registration" : "Create your account"}
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  I want to join as
                </label>
                <select
                  name="role"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white ${
                    errors.role ? "border-red-500" : "border-gray-600"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" className="text-gray-400">
                    Select your role
                  </option>
                  <option value="freelancer" className="text-white">
                    Freelancer
                  </option>
                  <option value="client" className="text-white">
                    Client
                  </option>
                </select>
                {errors.role && (
                  <p className="text-red-400 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Create Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white ${
                        errors.password ? "border-red-500" : "border-gray-600"
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white ${
                        errors.otp ? "border-red-500" : "border-gray-600"
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 mt-4"
              >
                {isSendOtp ? "Create Account" : "Send Verification OTP"}
              </button>

              {/* Redirect to Login */}
              <p className="text-sm text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {appLoading && <Loader />}
    </>
  );
};

export { SignupPage };
