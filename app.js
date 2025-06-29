const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Importando as rotas
const loginRoutes = require("./routes/login.route");
const setorRoutes = require("./routes/setor.route");
const categoriaRoutes = require("./routes/categorias.route");
const artigoRoutes = require("./routes/artigos.route");
const modulosRoutes = require("./routes/modulos.route");
const usuariosRoutes = require("./routes/usuarios.route");
const recompensasRoutes = require("./routes/recompensas.route");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/login", loginRoutes); // Rota de login
app.use("/api/setores", setorRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/artigos", artigoRoutes);
app.use("/api/modulos", modulosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("api/recompensas", recompensasRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocorreu um erro no servidor" });
});

module.exports = app;
