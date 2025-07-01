const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const controller = require("../models/categorias.models");

// --- VÍDEOS ASSISTIDOS ---

// Marcar vídeo assistido
router.post("/videos-assistidos", async (req, res) => {
  const { usuario_id, conteudo_id } = req.body;
  if (!usuario_id || !conteudo_id) {
    return res
      .status(400)
      .json({ error: "usuario_id e conteudo_id são obrigatórios" });
  }

  try {
    const jaVisto = await prisma.videoAssistido.findUnique({
      where: { usuario_id_conteudo_id: { usuario_id, conteudo_id } },
    });
    if (jaVisto) {
      return res
        .status(200)
        .json({ message: "Vídeo já marcado como assistido" });
    }

    const videoAssistido = await prisma.videoAssistido.create({
      data: { usuario_id, conteudo_id },
    });
    res.status(201).json(videoAssistido);
  } catch {
    res.status(500).json({ error: "Erro ao marcar vídeo assistido" });
  }
});

// Listar vídeos assistidos de um usuário
router.get("/videos-assistidos/:usuario_id", async (req, res) => {
  const usuario_id = Number(req.params.usuario_id);
  try {
    const videos = await prisma.videoAssistido.findMany({
      where: { usuario_id },
      include: { conteudo: true },
    });
    res.json(videos);
  } catch {
    res.status(500).json({ error: "Erro ao buscar vídeos assistidos" });
  }
});

// --- CONTAGEM DE VIEWS ---

// Incrementar view (artigo, modulo ou conteúdo)
router.post("/views", async (req, res) => {
  const { artigo_id, modulo_id, conteudo_id } = req.body;
  if (
    (!artigo_id && !modulo_id && !conteudo_id) ||
    (artigo_id && modulo_id) ||
    (artigo_id && conteudo_id) ||
    (modulo_id && conteudo_id)
  ) {
    return res
      .status(400)
      .json({
        error: "Informe exatamente um dos: artigo_id, modulo_id ou conteudo_id",
      });
  }

  try {
    let where = {};
    let data = {};

    if (artigo_id) {
      where = { artigo_id };
      data = { artigo_id, total_views: { increment: 1 } };
    } else if (modulo_id) {
      where = { modulo_id };
      data = { modulo_id, total_views: { increment: 1 } };
    } else if (conteudo_id) {
      where = { conteudo_id };
      data = { conteudo_id, total_views: { increment: 1 } };
    }

    // Upsert: atualiza se existir, cria se não existir
    const viewCount = await prisma.viewCount.upsert({
      where,
      update: { total_views: { increment: 1 } },
      create: { ...data, total_views: 1 },
    });

    res.json(viewCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao incrementar views" });
  }
});

// Buscar contagem de views
router.get("/views", async (req, res) => {
  const { artigo_id, modulo_id, conteudo_id } = req.query;

  const where = {};
  if (artigo_id) where.artigo_id = Number(artigo_id);
  if (modulo_id) where.modulo_id = Number(modulo_id);
  if (conteudo_id) where.conteudo_id = Number(conteudo_id);

  try {
    const views = await prisma.viewCount.findMany({ where });
    res.json(views);
  } catch {
    res.status(500).json({ error: "Erro ao buscar views" });
  }
});

module.exports = router;
