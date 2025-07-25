import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";

const MyProjects = () => {
  const { user } = useAppContext();
  const { name, role } = user;
  console.log(name, role);

  const [myProject, setMyProject] = useState([]);
  const getUserDetails = async () => {
    try {
      const resp = await axiosInstance("/project/myProject");
      console.log(resp.data.data);
      if (resp.status === 200 && resp.data.isSuccess) {
        SuccessToast("data fetched succesfully");
        setMyProject(resp.data.data);
      } else {
        ErrorToast("error in fetching data", resp?.data?.message);
      }
    } catch (err) {
      ErrorToast("error while fetching data", err.message);
    }
  };

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
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {myProject.map((project) => {
        return (
          <div
            key={project._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h1 className="text-xl font-semibold text-blue-700 mb-2">
              {project.title}
            </h1>
            <p className="text-gray-700 mb-3">{project.description}</p>

            <div className="space-y-1 text-sm text-gray-600">
              <p>👤 Client: {project.clientName || "Not assigned"}</p>
              <p>👷 Freelancer: {project.freelancerName || "Not assigned"}</p>
              <p>💰 Budget: ₹{project.budget || "Negotiable"}</p>
              <p>🛠 Tech: {formatTechnologies(project.technologies)}</p>
              <p>📅 Deadline: {project.deadline}</p>
              <p
                className={`${
                  project.status === "open" ? "text-green-600" : "text-gray-600"
                }`}
              >
                {project.status === "open" ? "🟢 Open" : "🔴 Closed"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { MyProjects };
