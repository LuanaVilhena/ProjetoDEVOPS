import React, { useState, useEffect } from 'react';

function RegisterForm({ onRegister, registerFeedback }) {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    cellphone: "",
    cpf: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Evita múltiplos envios
    setIsSubmitting(true);
    console.log("Dados enviados para registro:", registerForm);
    const response = await onRegister(registerForm);
    setIsSubmitting(false);
    if (response?.type === 'success') {
      setRegisterForm({ name: "", email: "", password: "", cellphone: "", cpf: "" });
    }
  };
  useEffect(() => {
    return () => {
      if (registerFeedback.type !== "") {
        registerFeedback.type = "";
        registerFeedback.message = "";
      }
    };
  }, []);

  useEffect(() => {
    if (registerFeedback.type === 'success') {
      setRegisterForm({ name: "", email: "", password: "", cellphone: "", cpf: "" });
    }
  }, [registerFeedback]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm transition-colors duration-300 border border-pink-300">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">
        Registrar Novo Usuário
      </h1>
      {registerFeedback.message && (
        <p className={`${registerFeedback.type === 'error' ? 'text-red-500' : 'text-green-500'} text-sm mb-4 text-center`}>
          {registerFeedback.message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={registerForm.name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-pink-300 rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={registerForm.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-pink-300 rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={registerForm.password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-pink-300 rounded-md"
      />
      <input
        type="text"
        name="cellphone"
        placeholder="Telefone"
        value={registerForm.cellphone}
        onChange={handleChange}
        required
        className="w-full p-2 border border-pink-300 rounded-md"
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF (000.000.000-00)"
        value={registerForm.cpf}
        onChange={handleChange}
        required
        className="w-full p-2 border border-pink-300 rounded-md"
      />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;