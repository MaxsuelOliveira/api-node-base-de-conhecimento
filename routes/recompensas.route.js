const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const { Recompensa, UsuarioRecompensa } = require("../controllers/recompensas.controller");

router.post("/", auth, is_admin, (req, res) => {
  Recompensa.create(req.body, (err, recompensa) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(recompensa);
  });
});

router.put("/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  Recompensa.update(id, req.body, (err, recompensa) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(recompensa);
  });
});

router.get("/", (req, res) => {
  Recompensa.getAll((err, recompensas) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(recompensas);
  });
});

router.delete("/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  Recompensa.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Recompensa deletada" });
  });
});

router.post("/usuarios/:usuario_id", auth, is_admin, (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  const data = { ...req.body, usuario_id };
  UsuarioRecompensa.atribuir(data, (err, recebida) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(recebida);
  });
});

router.get("/usuarios/:usuario_id", (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  UsuarioRecompensa.getByUsuario(usuario_id, (err, lista) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(lista);
  });
});

router.put("/recebida/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  UsuarioRecompensa.update(id, req.body, (err, atualizado) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(atualizado);
  });
});

module.exports = router;