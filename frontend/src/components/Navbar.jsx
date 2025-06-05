import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 2, borderBottom: "3px solid #ff4da6" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
          {/* Logo */}
          <IconButton edge="start" component={Link} to="/" sx={{ p: 0 }}>
            <img src="/Logo.png" alt="Logo" width={100} height={100} />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              sx={{
                color: "#ff4da6",
                fontWeight: "bold",
                borderBottom: "3px solid transparent",
                "&:hover": { borderBottom: "3px solid #ff4da6", transition: "0.3s ease-in-out" },
              }}
              component={Link}
              to="/destaques"
            >
              Destaques
            </Button>
            <Button
              sx={{
                color: "#ff4da6",
                fontWeight: "bold",
                borderBottom: "3px solid transparent",
                "&:hover": { borderBottom: "3px solid #ff4da6", transition: "0.3s ease-in-out" },
              }}
              component={Link}
              to="/anuncios" 
            >
              Anunciar
            </Button>
            <Button
              sx={{
                color: "#ff4da6",
                fontWeight: "bold",
                borderBottom: "3px solid transparent",
                "&:hover": { borderBottom: "3px solid #ff4da6", transition: "0.3s ease-in-out" },
              }}
              component={Link}
              to="/perfil"
            >
              Perfil
            </Button>
            <Button
              sx={{
                color: "#ff4da6",
                fontWeight: "bold",
                borderBottom: "3px solid transparent",
                "&:hover": { borderBottom: "3px solid #ff4da6", transition: "0.3s ease-in-out" },
              }}
              component={Link}
              to="/sobre"
            >
              Informações
            </Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton sx={{ color: "#ff4da6" }} edge="end" onClick={handleMenuOpen} aria-label="Abrir menu">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose} component={Link} to="/destaques">Destaques</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/anuncios">Anúncios</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/perfil">Perfil</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/sobre">Informações</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;