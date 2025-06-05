import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import AuthPage from "./components/AuthPage";
import Home from "./pages/Home";
import Anunciar from "./pages/Anunciar";
import Destaques from "./pages/Destaques";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/Sobre";
import LoggedInView from "./components/LoggedInView";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [directoryEntries, setDirectoryEntries] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [registerFeedback, setRegisterFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    if (isLoggedIn) {
      fetchDirectory();
    } else {
      setDirectoryEntries([]);
    }
  }, [isLoggedIn]);

  const fetchDirectory = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/directory`, {
        headers: { Authorization: "Bearer " + token },
      });
      setDirectoryEntries(res.data);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logout();
      }
    }
  };

  const handleLogin = async (loginData) => {
    setLoginError("");
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError(`Erro no login: ${error.response ? error.response.data : "Credenciais inválidas"}`);
    }
  };

  const handleRegister = async (registerData) => {
    setRegisterFeedback({ type: "", message: "" });
    try {
      await axios.post(`${API_URL}/register`, registerData);
      setRegisterFeedback({ type: "success", message: "Usuário registrado com sucesso! Faça o login." });
    } catch (error) {
      setRegisterFeedback({ type: "error", message: `Erro no registro: ${error.response ? error.response.data : error.message}` });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setDirectoryEntries([]);
    setLoginError("");
    setRegisterFeedback({ type: "", message: "" });
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destaques" element={<Destaques />} />
        <Route path="/anuncios" element={<Anunciar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<AuthPage onLogin={handleLogin} onRegister={handleRegister} loginError={loginError} registerFeedback={registerFeedback} />} />
        {isLoggedIn && <Route path="/dashboard" element={<LoggedInView directoryEntries={directoryEntries} onLogout={logout} />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;