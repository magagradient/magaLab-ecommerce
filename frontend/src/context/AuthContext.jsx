import { createContext, useState, useEffect } from "react";
import { loginRequest, getProfileRequest } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // cuando carga la app y hay token guardado
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const profile = await getProfileRequest(token);
        setUser(profile.data);
      } catch (error) {
        console.error(error);
        logout();
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);

    localStorage.setItem("token", data.token);
    setToken(data.token);

    const profile = await getProfileRequest(data.token);
    setUser(profile.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};