import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Input } from "@mui/material";
import { MenuItem } from "@mui/material";

const API_URL = "http://localhost:5000";
const API_URL_ANUNCIOS = `${API_URL}/anuncios`;

const categorias = ["Imóveis", "Veículos", "Eletrônicos", "Moda", "Serviços", "Esportes", "Casa e Jardim", "Brinquedos", "Livros", "Outros"];

const Anuncio = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const cadastrarAnuncio = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !preco || !categoria || !imagem) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("categoria", categoria);
    formData.append("imagem", imagem);

    const token = localStorage.getItem("token");
    try {
      await axios.post(API_URL_ANUNCIOS, formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`  } });
      alert("Anúncio publicado!");
      navigate("/anuncios");
    } catch (error) {
      alert("Erro ao publicar anúncio.");
    }
  };


  return (
    <Box
      component="form"
      onSubmit={cadastrarAnuncio}
      noValidate
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 4,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(255, 77, 166, 0.2)"
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" color="#ff4da6">
        Publicar Anúncio
      </Typography>
      <TextField label="Título" fullWidth margin="normal" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <TextField label="Descrição" fullWidth multiline rows={4} margin="normal" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      <TextField label="Preço" type="number" fullWidth margin="normal" value={preco} onChange={(e) => setPreco(e.target.value)} required />
      <TextField select label="Categoria" fullWidth margin="normal" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
        {categorias.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
      </TextField>

      <Input type="file" accept="image/*" onChange={handleImageChange} sx={{ mt: 2, display: "block" }} />
      
      <Button type="submit" variant="contained" sx={{ mt: 3, width: "100%", backgroundColor: "#ff4da6", "&:hover": { backgroundColor: "#ff3385" } }}>
        Publicar Anúncio
      </Button>
    </Box>
  );
};

export default Anuncio;