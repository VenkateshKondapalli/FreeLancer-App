import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { ProjectCardsAll } from "../components/ProjectCardsAll";
import { useAppContext } from "../context/appContext";
import { MyProjects } from "../components/MyProjects";

const ProjectPage = () => {
  const { user } = useAppContext();
  const { role, name } = user;

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
    try {
      const resp = await axiosInstance.post("/project", project);
      if (resp.status === 201 && resp.data.isSucess) {
        console.log(resp.data);
        SuccessToast("Project Added Successfully"); // Reset form and hide it
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
      console.log(err.message);
      ErrorToast("Error while posting the project", err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {role === "client" && (
        <div className="p-6 mt-16">
          <button
            className="text-white bg-blue-600 px-4 py-2 rounded mb-6 hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add New Project"}
          </button>

          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.title}
              />
              <input
                type="text"
                name="clientName"
                className="w-full p-2 border rounded bg-gray-100"
                value={project.clientName}
                readOnly
              />
              <textarea
                name="description"
                placeholder="Project Description"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.description}
              />
              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma separated)"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.technologies}
              />
              <input
                type="number"
                name="budget"
                placeholder="Budget in $"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.budget}
              />
              <input
                type="text"
                name="deadline"
                placeholder="Deadline (e.g. 31 July)"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.deadline}
              />
              <select
                name="status"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                value={project.status}
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddProject}
              >
                Add Project
              </button>
            </div>
          )}
        </div>
      )}

      <div className={`p-6 ${role === "client" ? "" : "pt-24"}`}>
        {/* Tabs above heading - matches your screenshot */}
        <div className="flex mb-2">
          {" "}
          {/* Reduced margin-bottom */}
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Projects
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "my"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("my")}
          >
            {role === "client" ? "My Projects" : "My Assignments"}
          </button>
        </div>

        {/* Heading below tabs */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {activeTab === "all"
            ? "All Projects"
            : role === "client"
            ? "My Projects"
            : "My Assignments"}
        </h2>

        {activeTab === "all" ? (
          <ProjectCardsAll />
        ) : role === "client" ? (
          <MyProjects />
        ) : (
          <MyProjects />
        )}
      </div>
    </div>
  );
};

export { ProjectPage };
