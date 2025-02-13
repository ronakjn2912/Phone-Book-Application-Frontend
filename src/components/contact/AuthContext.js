import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsAuthenticated(loginStatus==="true");
  }, []);




  const login = () => {
    // Set the login status in localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Immediately update the state
    setIsAuthenticated(true);
    navigate("/WelcomeBack");
    window.location.reload();//reload so that navbar gets mounted again and logout link appears

  };

  const logout = () => {
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };