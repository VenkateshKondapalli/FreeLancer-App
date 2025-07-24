import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { ErrorToast } from "../utils/toastHelper";

const MyProjects = () => {
  const { user } = useAppContext();
  const { name, role } = user;
  console.log(name, role);

  const [myProject, setMyProject] = useState([]);

  const getUserDetails = async () => {
    try {
      const resp = await getUserDetails("/project/myProject");
      console.log(resp.data);
    } catch (err) {
      ErrorToast("error while fetching data", err.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export { MyProjects };
