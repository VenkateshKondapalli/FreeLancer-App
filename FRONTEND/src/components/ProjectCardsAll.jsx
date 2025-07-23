import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Navbar } from "./Navbar";
import { ErrorToast } from "../utils/toastHelper";

const ProjectCardsAll = () => {
  const [user, setuser] = useState([]);

  const getAllProjects = async () => {
    try {
      const resp = await axiosInstance.get("/project");
      // console.log(resp.data);
      const data = resp.data.data;
      console.log(data);
      setuser(data);
    } catch (err) {
      console.log(err.message);
      ErrorToast("Error in fetch the data", err.message);
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {user.map((elem) => (
          <div key={elem._id} className="bg-white shadow-md rounded p-4">
            <h1 className="text-xl font-semibold text-blue-700">
              {elem.title}
            </h1>
            <h2 className="text-gray-700 mb-1">{elem.description}</h2>
            <h2 className="text-sm text-gray-600">💰 Budget: ₹{elem.budget}</h2>
            <h2 className="text-sm text-gray-600">
              🛠 Tech: {elem.technologies?.join(", ")}
            </h2>
            <h2 className="text-sm text-gray-600">
              📅 Deadline: {elem.deadline}
            </h2>
            <h2 className="text-sm text-gray-600">🟢Status: {elem.status}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProjectCardsAll };
