import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");

        if (!token) {
          console.log("No token found, not authenticated.");
          setIsAuthenticated(false);
          return;
        }

        const { data } = await axios.get(
          "http://localhost:5000/user/api/getMy-Profile",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched profile data:", data.user);
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthenticated(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/blog/api/all-blogs",
          { withCredentials: true }
        );
        console.log("Fetched Blogs:", data);
        setBlogs(data.allBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.response || error.message);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
