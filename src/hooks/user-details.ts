import { useState, useEffect } from "react";

interface User {
  avatar: string;
  createdAt: string;
  email: string;
  name: string;
  password: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve the accessToken and user from localStorage
    const token = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");

    if (token) {
      setAccessToken(token);
    }

    if (userString) {
      try {
        const userObj = JSON.parse(userString);
        setUser(userObj);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUser(null);
      }
    }
  }, []); // Empty dependency array to run only once on component mount

  return { accessToken, user };
};

export default useAuth;
