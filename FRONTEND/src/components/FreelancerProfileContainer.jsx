import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { useAppContext } from "../context/appContext";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const FreelancerProfileContainer = () => {
  const user = useAppContext();
  const { email, role } = user.user;
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExprerience] = useState("");
  const [bio, setBio] = useState("");
  const [userExist, setUserExist] = useState(false);

  const getUserDetails = async () => {
    try {
      const resp = await axiosInstance.get("/users/details");

      console.log(resp.data);
      if (resp.status === 200 && resp.data.isSuccess) {
        const userData = resp.data.data;
        console.log("User data fetched:", userData);

        setFullName(userData.fullName || "");
        setSkills(userData.skills || "");
        setExprerience(userData.experience || "");
        setBio(userData.bio || "");

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
      skills,
      experience,
      bio,
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
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Freelancer Profile</h2>
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          required
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          name="skills"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Experience</label>
        <input
          type="text"
          name="experience"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          value={experience}
          onChange={(e) => {
            setExprerience(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={handleProfile}
      >
        Save Profile
      </button>
    </div>
  );
};
export { FreelancerProfileContainer };
