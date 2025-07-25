import { createContext, useContext, useEffect, useState } from "react";
import { ErrorToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";

const AppContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export function useAppContext() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(false);
  const [user, setUser] = useState({ isAuthenticated: false });
  const [imageUrl, setImageUrl] = useState("");

  const getUserDetails = async () => {
    try {
      setAppLoading(true);
      const resp = await axiosInstance.get("/users");
      // console.log(resp);

      if (resp.data.isSuccess) {
        // console.log(resp.data);
        const { userInfo, name } = resp.data.data;
        setUser({
          isAuthenticated: true,
          ...userInfo,
          name,
        });
      } else {
        ErrorToast("Error in user validation", resp.data.message);
      }
    } catch (err) {
      console.log(err.message);
      // ErrorToast("Error in user Validation ", err.message);
    } finally {
      setAppLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const valueObj = {
    appLoading,
    setAppLoading,
    user,
    imageUrl,
    setImageUrl,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
