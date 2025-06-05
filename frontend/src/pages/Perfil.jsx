import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", cellphone: "" });
  const [registerFeedback, setRegisterFeedback] = useState({ type: "", message: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setUpdatedUser(res.data);
      } catch (err) {
        setError("Erro ao carregar perfil.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setError("");
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 2000);
    } catch (error) {
      setError("Erro ao fazer login.");
      setLoginSuccess(false);
    }
  };

  const handleRegister = async (registerData) => {
    try {
      await axios.post(`${API_URL}/register`, registerData);
      setRegisterFeedback({ type: "success", message: "Usuário registrado com sucesso!" });
      setError("");
    } catch (error) {
      setRegisterFeedback({ type: "error", message: error.response?.data || "Erro ao registrar." });
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/me/profile`, updatedUser, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      setError("Erro ao atualizar perfil.");
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
    setRegisterFeedback({ type: "", message: "" });
    setError("");
  };

  if (loading) return <p className="text-center text-pink-500">Carregando...</p>;

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full p-6 border border-pink-300 rounded-md shadow-md bg-white">
          <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
            {isLogin ? "Entrar" : "Registrar"}
          </h2>
          {isLogin && loginSuccess && (
            <p className="text-green-500 text-center mb-2">Login realizado com sucesso!</p>
          )}
          {isLogin && error && <p className="text-center text-red-500">{error}</p>}

          {isLogin ? (
            <LoginForm onLogin={handleLogin} loginError={error} />
          ) : (
            <RegisterForm onRegister={handleRegister} registerFeedback={registerFeedback} />
          )}

          <button onClick={handleToggleLogin} className="w-full text-pink-600 font-bold mt-4">
            {isLogin ? "Criar conta" : "Já tenho uma conta"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-md mx-auto p-6 border border-pink-300 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Meu Perfil</h2>

        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-2 border border-pink-300 rounded-md mb-2"
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-2 border border-pink-300 rounded-md mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="cellphone"
              value={updatedUser.cellphone}
              onChange={handleChange}
              className="w-full p-2 border border-pink-300 rounded-md mb-2"
              placeholder="Telefone"
            />
            <button onClick={handleSave} className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
              Salvar
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700"><strong>Nome:</strong> {user.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700"><strong>Telefone:</strong> {user.cellphone || "Não informado"}</p>
            <button onClick={() => setEditMode(true)} className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 mt-4">
              Editar Perfil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Perfil;