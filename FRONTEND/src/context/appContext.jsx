import { createContext, useContext, useEffect, useState } from "react";
import { ErrorToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";

const AppContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export function useAppContext() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState({ isAuthenticated: false });

  const getUserDetails = async () => {
    try {
      setAppLoading(true);
      const resp = await axiosInstance.get("/users");
      // console.log(resp);

      if (resp.data.isSuccess) {
        setUser({
          isAuthenticated: true,
          ...resp.data.data.user,
        });
      } else {
        ErrorToast("Error in user validation", resp.data.message);
      }
    } catch (err) {
      console.log(err.message);
      // ErrorToast("Error in user Validation ", err.message);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const valueObj = {
    appLoading,
    user,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
