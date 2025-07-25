import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";
import { Loader } from "../components/Loader";

const MyProjects = () => {
  const { user, appLoading } = useAppContext();
  const { role } = user;
  const [myProjects, setMyProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyProjects = async () => {
    setIsLoading(true);
    try {
      const resp = await axiosInstance("/project/myProject");
      if (resp.status === 200 && resp.data.isSuccess) {
        setMyProjects(resp.data.data);
      } else {
        ErrorToast(resp?.data?.message || "Error fetching projects");
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTechnologies = (techArray) => {
    if (!techArray || techArray.length === 0) return "Not specified";
    if (typeof techArray === "string") return techArray;
    if (techArray[0].includes(",")) {
      return techArray[0]
        .split(",")
        .map((t) => t.trim())
        .join(", ");
    }
    return techArray.join(", ");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      open: {
        text: "Open",
        color:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      },
      "in progress": {
        text: "In Progress",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      },
      completed: {
        text: "Completed",
        color:
          "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
      },
      closed: {
        text: "Closed",
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
    };
    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusMap[status]?.color}`}
      >
        {statusMap[status]?.text || status}
      </span>
    );
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  if (appLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader message="Loading your projects..." />
      </div>
    );
  }

  if (myProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          No projects found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {role === "client"
            ? "Get started by creating your first project"
            : "Check back later for new assignments"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myProjects.map((project) => (
        <div
          key={project._id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200/70 dark:border-gray-700/50 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
        >
          <div className="p-5">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                {project.title}
              </h3>
              {getStatusBadge(project.status)}
            </div>

            <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
              {project.description || "No description provided"}
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Client: {project.clientName || "Not assigned"}</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Freelancer: {project.freelancerName || "Not assigned"}
                </span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Budget: ₹{project.budget || "Negotiable"}</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Tech: {formatTechnologies(project.technologies)}</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Deadline: {project.deadline || "Flexible"}</span>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200/50 dark:border-gray-600/50">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center">
              View Details
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { MyProjects };
