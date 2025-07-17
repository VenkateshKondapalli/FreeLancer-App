import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { useAppContext } from "../context/appContext";

const ClientProfileContainer = () => {
  const user = useAppContext();
  const { email, role } = user.user;
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [description, setDescription] = useState("");
  const [userExist, setUserExist] = useState("");

  const getUserDetails = async () => {
    try {
      const resp = await axiosInstance.get("/users/details");

      console.log(resp.data);
      if (resp.status === 200 && resp.data.isSuccess) {
        const userData = resp.data.data;
        console.log("User data fetched:", userData);

        setFullName(userData.fullName || "");
        setCompanyName(userData.companyName || "");
        setProjectType(userData.projectType || "");
        setBudgetRange(userData.budgetRange || "");
        setDescription(userData.description || "");

        setUserExist(true);
      } else {
        console.warn(
          "User data fetch failed:",
          resp.data.message || "Unknown error"
        );
        setUserExist(false);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setUserExist(false);
      ErrorToast(err.response?.data?.message || "Failed to fetch user details");
    }
  };

  const handleProfile = async () => {
    const dataobj = {
      email,
      role,
      fullName,
      companyName,
      projectType,
      budgetRange,
      description,
    };
    try {
      let resp;

      if (userExist) {
        resp = await axiosInstance.patch("/users/profile", dataobj);

        if (resp.status === 200) {
          SuccessToast("Profile updated successfully");
        } else {
          ErrorToast("Failed to update profile");
        }
      } else {
        resp = await axiosInstance.post("/users/profile", dataobj);

        if (resp.status === 201) {
          SuccessToast("Profile created successfully");
        } else {
          ErrorToast("Failed to create profile");
        }
      }

      console.log("Server Response:", resp.data);
    } catch (err) {
      console.error("Error in handleProfile:", err);
      ErrorToast(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Client Profile
      </h2>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Project Type
        </label>
        <input
          type="text"
          name="projectType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Budget Range
        </label>
        <input
          type="text"
          name="budgetRange"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Project Description
        </label>
        <textarea
          name="description"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
          onClick={handleProfile}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export { ClientProfileContainer };
