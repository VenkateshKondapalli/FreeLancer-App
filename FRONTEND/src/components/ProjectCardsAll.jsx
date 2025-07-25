import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { useAppContext } from "../context/appContext";

const ProjectCardsAll = () => {
  const [projects, setProjects] = useState([]);
  const { user: authUser } = useAppContext();
  const [showRegister, setShowRegister] = useState(false);

  const getAllProjects = async () => {
    try {
      const resp = await axiosInstance.get("/project");
      setProjects(resp.data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      ErrorToast("Error fetching projects", err.message);
    }
  };

  useEffect(() => {
    if (authUser?.role === "freelancer") {
      setShowRegister(true);
    }
    getAllProjects();
  }, [authUser?.role]);

  const formatTechnologies = (techArray) => {
    if (!techArray || techArray.length === 0) return "Not specified";
    if (techArray[0].includes(",")) {
      return techArray[0]
        .split(",")
        .map((t) => t.trim())
        .join(", ");
    }
    return techArray.join(", ");
  };

  const handleRegister = async (id, name) => {
    try {
      const dataObj = {
        id,
        name,
      };

      const resp = await axiosInstance.patch("/project/register", dataObj);

      if (resp?.data?.isSuccess) {
        SuccessToast("Project registered successfully!");
      } else {
        ErrorToast(
          "Registration failed",
          resp?.data?.message || "Unknown error"
        );
      }
    } catch (err) {
      ErrorToast("Error while registering project", err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-700"
        >
          <h1 className="text-xl font-semibold text-blue-400 mb-2">
            {project.title}
          </h1>
          <p className="text-gray-300 mb-3">{project.description}</p>

          <div className="space-y-1 text-sm text-gray-400">
            <p>👤 Client: {project.clientName || "Not assigned"}</p>
            <p>👷 Freelancer: {project.freelancerName || "Not assigned"}</p>
            <p>💰 Budget: ₹{project.budget || "Negotiable"}</p>
            <p>🛠 Tech: {formatTechnologies(project.technologies)}</p>
            <p>📅 Deadline: {project.deadline}</p>
            <p
              className={`${
                project.status === "open" ? "text-green-400" : "text-gray-400"
              }`}
            >
              {project.status === "open" ? "🟢 Open" : "🔴 Closed"}
            </p>
          </div>

          {showRegister &&
            !project.freelancerName &&
            project.status === "open" && (
              <button
                className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
                onClick={() => {
                  handleRegister(project._id, authUser.name);
                }}
              >
                Register
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export { ProjectCardsAll };
