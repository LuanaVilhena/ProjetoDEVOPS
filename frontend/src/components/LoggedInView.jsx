import React from "react";

function LoggedInView({ onLogout }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">
      <div className="max-w-md w-full p-6 border border-pink-300 rounded-md shadow-md bg-white text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Bem-vindo!</h2>
        <p className="text-gray-600 mb-6">Clique abaixo para sair da sua conta.</p>
        <button
          onClick={onLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default LoggedInView;