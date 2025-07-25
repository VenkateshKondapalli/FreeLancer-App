import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { ProjectCardsAll } from "../components/ProjectCardsAll";
import { useAppContext } from "../context/appContext";
import { MyProjects } from "../components/MyProjects";
import { Loader } from "../components/Loader";

const ProjectPage = () => {
  const { user, appLoading } = useAppContext();
  const { role, name } = user || {};
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [project, setProject] = useState({
    title: "",
    description: "",
    clientName: "",
    freelancerName: "",
    technologies: "",
    budget: "",
    deadline: "",
    status: "open",
  });

  useEffect(() => {
    if (role === "client" && name) {
      setProject((prev) => ({
        ...prev,
        clientName: name,
      }));
    }
  }, [role, name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = async () => {
    setIsLoading(true);
    try {
      const resp = await axiosInstance.post("/project", project);
      if (resp.status === 201 && resp.data.isSuccess) {
        SuccessToast("Project Added Successfully");
        setProject({
          title: "",
          description: "",
          clientName: role === "client" ? name : "",
          freelancerName: "",
          technologies: "",
          budget: "",
          deadline: "",
          status: "open",
        });
        setShowForm(false);
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Error adding project");
    } finally {
      setIsLoading(false);
    }
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader message="Loading projects..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Main content with proper top padding */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {" "}
        {/* Increased pt-24 to pt-28 */}
        {/* Client-specific actions */}
        {role === "client" && (
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Project Dashboard
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showForm
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } shadow-md hover:shadow-lg`}
            >
              {showForm ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  New Project
                </>
              )}
            </button>
          </div>
        )}
        {/* Freelancer-specific header */}
        {role === "freelancer" && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Available Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Browse projects matching your skills
            </p>
          </div>
        )}
        {/* Project form (client only) */}
        {role === "client" && showForm && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Create New Project
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.title}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
                    value={project.clientName}
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.description}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Technologies*
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.technologies}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Budget (₹)*
                  </label>
                  <input
                    type="number"
                    name="budget"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.budget}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deadline*
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.deadline}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onChange={handleChange}
                    value={project.status}
                  >
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleAddProject}
                  disabled={isLoading}
                  className={`flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors shadow-md hover:shadow-lg`}
                >
                  {isLoading ? (
                    <>
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
                      Processing...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Tab navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "all"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                {role === "client" ? "All Projects" : "Available Projects"}
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "my"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("my")}
              >
                {role === "client" ? "My Projects" : "My Assignments"}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "all" ? (
              <ProjectCardsAll role={role} />
            ) : (
              <MyProjects role={role} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export { ProjectPage };
