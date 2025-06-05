import React from "react";

const produtos = [
  { id: 1, nome: "iPhone 13 - 128GB", preco: "R$ 4.500,00", img: "https://conteudo.imguol.com.br/c/noticias/d2/2021/11/17/iphone-13-1637175911288_v2_3x4.jpg" },
  { id: 2, nome: "Notebook Dell Inspiron", preco: "R$ 3.200,00", img: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, nome: "Bicicleta Caloi 29", preco: "R$ 1.500,00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7_BMQeKfm-Ev0WLPIKQmTx3F5UHwqD6Pbg&s" },
  { id: 4, nome: "Smart TV 55'' 4K", preco: "R$ 2.800,00", img: "https://i.zst.com.br/thumbs/12/6/1a/1549549671.jpg" },
  { id: 5, nome: "Fone de Ouvido Bluetooth", preco: "R$ 250,00", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSelwtjz4aCjygfCtGbX1VXYmgBZjYtr64UqbmHPQZezA53R16-5gSGQFdrmKirQuGzTRUZv_18YHnHwYSKAsQdZ1FYR_rjQ1sl_V_trLgxJ6Ef6JPMYng0unDQGP7ZZgMXNAIZAzGUvPk&usqp=CAc" }
];

function Destaques() {
  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Destaques</h2>
        <p className="text-gray-500 text-center mb-6">Confira os produtos mais populares e em promoção!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="border border-pink-300 rounded-lg p-4 shadow-lg bg-white">
              <img src={produto.img} alt={produto.nome} className="w-full h-56 object-cover rounded-lg" />
              <h3 className="text-lg font-medium text-gray-700 mt-2">{produto.nome}</h3>
              <p className="text-pink-600 font-semibold">{produto.preco}</p>
              <button className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destaques;