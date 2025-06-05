import React, { useState } from 'react';

function LoginForm({ onLogin, loginError }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mb-8 transition-colors duration-300 border border-pink-300">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">
        Login
      </h1>
      {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-pink-500">Email</label>
          <input
            id="login-email"
            name="email"
            type="email" 
            placeholder="Email"
            value={loginForm.email}
            onChange={handleChange}
            required 
            className="mt-1 w-full p-2 border border-pink-300 bg-white text-gray-900 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-pink-500">Senha</label>
          <input
            id="login-password"
            name="password"
            placeholder="Senha"
            type="password"
            value={loginForm.password}
            onChange={handleChange}
            required 
            className="mt-1 w-full p-2 border border-pink-300 bg-white text-gray-900 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginForm;