import axios from "axios";
const axios = require("axios");

const API_URL = "http://localhost:5000/user"; 

const fetchUser = async () => {
  try {
    const token = "SEU_TOKEN_AQUI"; // Coloque um token válido
    const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
    console.log("Usuário:", res.data);
  } catch (error) {
    console.error("Erro ao carregar perfil:", error.response ? error.response.data : error.message);
  }
};

fetchUser();