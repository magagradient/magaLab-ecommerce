import { createContext, useState, useEffect } from "react";
import { loginRequest, getProfileRequest } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("TOKEN EN EFFECT:", token);

      if (!token) {
        console.log("NO HAY TOKEN → no se carga perfil");
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await getProfileRequest(token);
        console.log("RESPUESTA CRUDA PROFILE:", response);

        const userData = response?.data || response;

        console.log("USER SETEADO DESDE EFFECT:", userData);

        setUser(userData);
      } catch (error) {
        console.error("ERROR EN EFFECT → logout automático:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    console.log("LOGIN INTENTANDO...");

    const response = await loginRequest(email, password);
    console.log("RESPUESTA LOGIN:", response);

    const newToken = response?.token || response?.data?.token;

    console.log("TOKEN GUARDADO EN LOGIN:", newToken);

    localStorage.setItem("token", newToken);
    setToken(newToken);

    const profileResponse = await getProfileRequest(newToken);
    console.log("RESPUESTA PROFILE DESDE LOGIN:", profileResponse);

    const userData = profileResponse?.data || profileResponse;

    console.log("USER SETEADO DESDE LOGIN:", userData);

    setUser(userData);
  };

  const logout = () => {
    console.log("LOGOUT EJECUTADO");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, checkingAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};