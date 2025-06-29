const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const {
  Modulos,
  modulo_conteudo,
} = require("../controllers/modulos.controller");

router.post("/", auth, is_admin, (req, res) => {
  console.log("Dados recebidos:", req.user.id, req.body);

  const data = {
    ...req.body,
    autor_id: req.user.id, // pega o ID do usuário logado via JWT
  };

  Modulos.create(data, (err, modulo) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(201).json(modulo);
  });
});

router.put("/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  Modulos.update(id, req.body, (err, modulo) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(modulo);
  });
});

router.get("/", (req, res) => {
  Modulos.getAll((err, modulos) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(modulos);
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Modulos.getById(id, (err, modulo) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!modulo)
      return res.status(404).json({ error: "Módulo não encontrado" });
    res.json(modulo);
  });
});

router.get("/:modulo_id/conteudos", (req, res) => {
  const modulo_id = parseInt(req.params.modulo_id);
  modulo_conteudo.getBymodulo_id(modulo_id, (err, conteudos) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(conteudos);
  });
});

router.delete("/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  Modulos.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Módulo deletado com sucesso" });
  });
});

router.post("/:modulo_id/conteudos", auth, is_admin, (req, res) => {
  const modulo_id = parseInt(req.params.modulo_id);
  const data = { ...req.body, modulo_id };
  modulo_conteudo.create(data, (err, conteudo) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(conteudo);
  });
});

router.put("/conteudos/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  modulo_conteudo.update(id, req.body, (err, conteudo) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(conteudo);
  });
});

router.delete("/conteudos/:id", auth, is_admin, (req, res) => {
  const id = parseInt(req.params.id);
  modulo_conteudo.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Conteúdo deletado com sucesso" });
  });
});

module.exports = router;
