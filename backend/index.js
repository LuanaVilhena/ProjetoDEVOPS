require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Garante nome único
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
// Para servir imagens estáticas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const JWT_SECRET = process.env.JWT_SECRET || "redo";
console.log("Iniciando backend...");

// Configuração do Pool de Conexões com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "docker",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Rota base para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.send("API do backend está funcionando!");
});

// Criação da tabela users
(async () => {
  try {
    console.log("Tentando criar/verificar tabela 'users'...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        cellphone VARCHAR(20) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL
      );
    `);
    console.log("Tabela 'users' verificada/criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar/verificar a tabela 'users':", err);
  }
})();

// Criação da tabela anuncios
(async () => {
  try {
    console.log("Tentando criar/verificar tabela 'anuncios'...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS anuncios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        usuario_id INT NOT NULL,
        imagem VARCHAR(255),
        FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("Tabela 'anuncios' verificada/criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar/verificar a tabela 'anuncios':", err);
  }
})();

function validarCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token não fornecido.");
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token inválido:", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.get("/directory", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT a.id, a.titulo, a.descricao, a.preco, a.categoria, a.imagem, u.name as usuario FROM anuncios a JOIN users u ON a.usuario_id = u.id"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar anúncios:", err);
    res.status(500).send("Erro ao buscar anúncios.");
  }
});
// Registro de novo usuário
app.post("/register", async (req, res) => {
  console.log("Dados recebidos no registro:", req.body); 
  const { name, email, password, cellphone, cpf } = req.body;

  if (!name || !email || !password || !cellphone || !cpf) {
    console.log("Campos obrigatórios (nome, email, senha, telefone, cpf) faltando no registro.");
    return res.status(400).send("Nome, email, senha, telefone e cpf são obrigatórios.");
  }
  if (!validarCPF(cpf)) {
    return res.status(400).send("CPF inválido. Use o formato 000.000.000-00");
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, cellphone, cpf) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, cellphone, cpf || null]
    );
    console.log("Usuário registrado com sucesso:", email);
    res.status(201).send("Usuário registrado com sucesso.");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      console.log("Usuário já existe:", email);
      res.status(409).send("Usuário já existe.");
    } else {
      console.error("Erro ao registrar:", err);
      res.status(500).send("Erro interno no servidor ao registrar.");
    }
  }
});

// Login de usuário
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Tentando login para:", email);

  if (!email || !password) {
    console.log("Email ou senha não fornecidos no login.");
    return res.status(400).send("Email e senha são obrigatórios.");
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, cellphone: user.cellphone, cpf: user.cpf },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("Login bem-sucedido para:", email);
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, cellphone: user.cellphone, cpf: user.cpf } });
    } else {
      console.log("Credenciais inválidas para:", email);
      res.status(401).send("Credenciais inválidas.");
    }
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).send("Erro interno no servidor ao tentar fazer login.");
  }
});

// Rota para obter informações do usuário logado
app.get("/me", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, cellphone, cpf FROM users WHERE id = ?",
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).send("Usuário não encontrado.");
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar dados do usuário logado:", err);
    res.status(500).send("Erro interno no servidor.");
  }
});

// Rota para atualizar perfil do usuário logado
app.put("/me/profile", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, cellphone } = req.body;

  if (!name && typeof cellphone === "undefined") {
    return res.status(400).send("Nenhum dado fornecido para atualização.");
  }

  const fieldsToUpdate = [];
  const values = [];

  if (name) {
    fieldsToUpdate.push("name = ?");
    values.push(name);
  }
  if (typeof cellphone !== "undefined") {
    fieldsToUpdate.push("cellphone = ?");
    values.push(cellphone === "" ? null : cellphone);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).send("Nenhum campo válido para atualização.");
  }

  values.push(userId);

  try {
    const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).send("Usuário não encontrado.");
    }
    console.log("Perfil do usuário", userId, "atualizado com sucesso.");
    const [updatedUserRows] = await pool.query(
      "SELECT id, name, email, cellphone, cpf FROM users WHERE id = ?",
      [userId]
    );
    res.json(updatedUserRows[0]);
  } catch (err) {
    console.error("Erro ao atualizar o perfil do usuário:", err);
    res.status(500).send("Erro interno do servidor ao atualizar perfil.");
  }
});

// Rota para criar um novo anúncio com upload de imagem
app.post("/anuncios", upload.single("imagem"), authenticateToken, async (req, res) => {
  const { titulo, descricao, preco, categoria } = req.body;
  const usuario_id = req.user.id;
  const imagem = req.file ? req.file.filename : null;

  if (!titulo || !descricao || !preco || !categoria || !imagem) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    await pool.query(
      "INSERT INTO anuncios (titulo, descricao, preco, categoria, usuario_id, imagem) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, descricao, preco, categoria, usuario_id, imagem]
    );
    res.status(201).send("Anúncio criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar anúncio:", err);
    res.status(500).send("Erro ao criar anúncio.");
  }
});

app.use((err, req, res, next) => {
  console.error("Ocorreu um erro não tratado:", err.stack);
  res.status(500).send("Algo deu errado no servidor!");
});

console.log("Preparando para escutar na porta", port);
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
console.log("Backend iniciado com sucesso.");