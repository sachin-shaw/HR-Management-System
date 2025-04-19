// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("auth");

    const restoreSession = async (parsed) => {
      try {
        // Optional: verify token with backend if needed
        const res = await axios.get("/auth/profile", {
          headers: { Authorization: `Bearer ${parsed.token}` },
        });

        setAuth({ user: res.data.user, token: parsed.token });
      } catch (error) {
        console.error("Session expired or invalid", error);
        localStorage.removeItem("auth");
      }
      setLoading(false);
    };

    if (storedData) {
      const parsed = JSON.parse(storedData);
      const now = Date.now();

      if (parsed.expiry && now < parsed.expiry) {
        restoreSession(parsed);
      } else {
        localStorage.removeItem("auth");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (user, token) => {
    const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    const authData = { user, token, expiry };
    setAuth({ user, token });
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
