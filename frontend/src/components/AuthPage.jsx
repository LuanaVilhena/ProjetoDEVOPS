import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage({ onLogin, onRegister, loginError, registerFeedback }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-900">
      <div className="max-w-md w-full p-6 border border-pink-300 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">{isLogin ? "Entrar" : "Registrar"}</h2>

        {isLogin ? (
          <LoginForm onLogin={onLogin} loginError={loginError} />
        ) : (
          <RegisterForm onRegister={onRegister} registerFeedback={registerFeedback} />
        )}

        <p className="text-sm text-center mt-4">
          {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-pink-600 font-bold">
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;