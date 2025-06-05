import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const DpoLgpd = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
      <Typography variant="h3" sx={{ marginBottom: 0 }}>
        DPO e LGPD
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Typography variant="body1" paragraph>
          A Lei Geral de Proteção de Dados (LGPD) é uma legislação brasileira que regula o tratamento de dados pessoais em diversos setores, tanto públicos quanto privados. Implementada para proteger a privacidade e os direitos dos titulares de dados, a LGPD impõe diretrizes rígidas para coleta, armazenamento e compartilhamento de informações pessoais.
        </Typography>
        <Typography variant="body1" paragraph>
          O DPO (Data Protection Officer), ou Encarregado de Proteção de Dados, é um profissional designado para garantir que uma organização esteja em conformidade com a LGPD. Esse profissional atua como ponto de contato entre a organização e os titulares de dados, bem como entre a organização e a Autoridade Nacional de Proteção de Dados (ANPD).
        </Typography>
        <Typography variant="body1">
          A seguir, você encontrará informações detalhadas sobre a importância da LGPD, o papel do DPO e como sua organização pode se beneficiar ao adotar práticas de conformidade. Entenda como a privacidade e a proteção de dados são fundamentais para o sucesso e a confiança dos seus clientes.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {[
          {
            titulo: "Compliance e Legislação",
            descricao: "A conformidade com a LGPD é essencial para proteger a privacidade dos dados e evitar penalidades legais.",
            imagem: "https://plus.unsplash.com/premium_photo-1661688118617-7a6834a9522c?q=80&w=2070&auto=format&fit=crop",
          },
          {
            titulo: "Gestão de Dados",
            descricao: "A coleta e o armazenamento seguro de dados pessoais são práticas fundamentais para a conformidade com a LGPD.",
            imagem: "https://plus.unsplash.com/premium_photo-1681487942927-e1a2786e6036?q=80&w=2070&auto=format&fit=crop",
          },
          {
            titulo: "Confiança e Transparência",
            descricao: "A transparência no tratamento de dados fortalece a confiança dos clientes e demonstra compromisso com a privacidade.",
            imagem: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#ffffff", borderRadius: "8px", textAlign: "center" }}>
              <img src={item.imagem} alt={item.titulo} style={{ width: "100%", borderRadius: "8px" }} />
              <Typography variant="h6" gutterBottom mt={2}>
                {item.titulo}
              </Typography>
              <Typography variant="body2">{item.descricao}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DpoLgpd;