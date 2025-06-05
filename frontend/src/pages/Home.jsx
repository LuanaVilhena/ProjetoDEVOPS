import React, { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, title: "iPhone 13 - 128GB", price: "R$ 4.500,00", img: "https://conteudo.imguol.com.br/c/noticias/d2/2021/11/17/iphone-13-1637175911288_v2_3x4.jpg" },
    { id: 2, title: "Notebook Dell Inspiron", price: "R$ 3.200,00", img: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, title: "Bicicleta Caloi 29", price: "R$ 1.500,00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7_BMQeKfm-Ev0WLPIKQmTx3F5UHwqD6Pbg&s" }
  ];

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Barra de busca */}
      <div className="max-w-lg mx-auto text-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Bem-vindo ao Marketplace!</h1>
        <p className="text-gray-500">Encontre tudo o que precisa.</p>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            className="w-full p-2 border border-pink-300 rounded-l-md focus:ring-pink-500 focus:border-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-pink-500 text-white px-4 rounded-r-md hover:bg-pink-600 transition">Buscar</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Destaques:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-pink-300 rounded-md p-4 shadow-md bg-white">
              <img src={product.img} alt={product.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-medium text-gray-700 mt-2">{product.title}</h3>
              <p className="text-pink-600 font-semibold">{product.price}</p>
              <button className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition">Ver detalhes</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;