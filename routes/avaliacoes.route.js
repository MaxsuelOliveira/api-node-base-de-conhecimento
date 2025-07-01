const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const controller = require("../models/categorias.models");


// Criar avaliação
router.post("/avaliacoes", async (req, res) => {
  const { usuario_id, artigo_id, modulo_id, conteudo_id, nota, comentario } = req.body;
  if (!usuario_id || !nota || (!artigo_id && !modulo_id && !conteudo_id)) {
    return res.status(400).json({ error: "Dados insuficientes para avaliação" });
  }

  try {
    const avaliacao = await prisma.avaliacao.create({
      data: { usuario_id, artigo_id, modulo_id, conteudo_id, nota, comentario },
    });
    res.status(201).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar avaliação" });
  }
});

// Listar avaliações (filtros opcionais)
router.get("/avaliacoes", async (req, res) => {
  const { usuario_id, artigo_id, modulo_id, conteudo_id } = req.query;

  const where = {};
  if (usuario_id) where.usuario_id = Number(usuario_id);
  if (artigo_id) where.artigo_id = Number(artigo_id);
  if (modulo_id) where.modulo_id = Number(modulo_id);
  if (conteudo_id) where.conteudo_id = Number(conteudo_id);

  try {
    const avaliacoes = await prisma.avaliacao.findMany({ where });
    res.json(avaliacoes);
  } catch {
    res.status(500).json({ error: "Erro ao listar avaliações" });
  }
});

module.exports = router;