import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { useAppContext } from "../context/appContext";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const DUMMY_IMAGE =
  "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1351.jpg?semt=ais_hybrid&w=740";

const FreelancerProfileContainer = () => {
  const { user } = useAppContext();
  const { email, role } = user;
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    imageUrl: "",
    fullName: "",
    skills: "",
    experience: "",
    bio: "",
  });
  const [userExist, setUserExist] = useState(false);

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const resp = await axiosInstance.get("/users/details");

      if (resp.status === 200 && resp.data.isSuccess) {
        const userData = resp.data.data;
        setProfile({
          imageUrl: userData.imageUrl || "",
          fullName: userData.fullName || "",
          skills: userData.skills || "",
          experience: userData.experience || "",
          bio: userData.bio || "",
        });
        setUserExist(true);
      } else {
        setUserExist(false);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setUserExist(false);
      ErrorToast(err.response?.data?.message || "Failed to fetch user details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfile = async () => {
    setIsSaving(true);
    const profileData = {
      email,
      role,
      ...profile,
    };

    try {
      let resp;

      if (userExist) {
        resp = await axiosInstance.patch("/users/profile", profileData);
        SuccessToast("Profile updated successfully");
      } else {
        resp = await axiosInstance.post("/users/profile", profileData);
        SuccessToast("Profile created successfully");
        setUserExist(true);
      }

      console.log("Server Response:", resp.data);
    } catch (err) {
      console.error("Error in handleProfile:", err);
      ErrorToast(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDPUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("displayPicture", e.target.files[0]);
      await axiosInstance.put("/users/display-picture", formData);
      SuccessToast("Profile picture updated successfully");
      await getUserDetails();
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 p-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Freelancer Profile
          </h2>
          <p className="text-blue-100 dark:text-blue-200 mt-1">
            Showcase your professional skills and experience
          </p>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 rounded-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => inputFileRef.current.click()}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md group-hover:border-blue-400 transition-all duration-300">
                <img
                  src={profile.imageUrl || DUMMY_IMAGE}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = DUMMY_IMAGE;
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                  Change Photo
                </span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleDPUpload}
              className="hidden"
              ref={inputFileRef}
            />
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click image to upload
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                JPG, PNG (Max 2MB)
              </p>
            </div>
          </div>

          {/* User Info Section */}
          <div className="space-y-1 mb-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                defaultValue={email}
                type="text"
                id="email"
                name="email"
                className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-600 dark:text-gray-300"
                disabled
              />
            </div>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  role === "freelancer"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                }`}
              >
                {role}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                required
                value={profile.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                value={profile.skills}
                onChange={handleInputChange}
                placeholder="e.g. React, Node.js, UI/UX Design"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate multiple skills with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience
              </label>
              <select
                name="experience"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                value={profile.experience}
                onChange={handleInputChange}
              >
                <option value="">Select your experience level</option>
                <option value="Entry Level">Entry Level (0-2 years)</option>
                <option value="Mid Level">Mid Level (2-5 years)</option>
                <option value="Senior Level">Senior Level (5+ years)</option>
                <option value="Expert">Expert (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Professional Bio
              </label>
              <textarea
                name="bio"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Describe your professional background, expertise, and what services you offer..."
              ></textarea>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {profile.bio.length}/500 characters
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              disabled={isSaving}
              className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                isSaving
                  ? "bg-blue-400 dark:bg-blue-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              } focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
              onClick={handleProfile}
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FreelancerProfileContainer };
