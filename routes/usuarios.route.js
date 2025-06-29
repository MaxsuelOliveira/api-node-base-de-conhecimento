const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const { Usuarios, usuario_modulo } = require("../controllers/usuarios.controller");

router.get("/", auth, is_admin, (req, res) => {
  Usuarios.getAll((err, usuarios) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuarios);
  });
});

router.post("/", auth, is_admin, (req, res) => {
  Usuarios.create(req.body, (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(usuario);
  });
});

router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  Usuarios.login(email, senha, (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario)
      return res.status(401).json({ error: "Credenciais inválidas" });
    res.json(usuario);
  });
});

router.delete("/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  Usuarios.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Usuário deletado com sucesso" });
  });
});

router.post("/:usuario_id/modulos", auth, is_admin, (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  const data = { ...req.body, usuario_id };
  usuario_modulo.assignModulo(data, (err, atribuido) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(atribuido);
  });
});

router.put("/modulos/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  usuario_modulo.updateStatus(id, req.body, (err, atualizado) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(atualizado);
  });
});

router.get("/:usuario_id/modulos", (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  usuario_modulo.getModulosByUsuario(usuario_id, (err, modulos) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(modulos);
  });
});

router.delete("/modulos/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  usuario_modulo.removeModulo(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Módulo removido do usuário com sucesso" });
  });
});

module.exports = router;
