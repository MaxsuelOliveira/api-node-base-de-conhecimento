const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Modulos = {
  create: async (data, callback) => {
    try {
      const modulo = await prisma.modulo.create({
        data: {
          slug: data.slug,
          titulo: data.titulo,
          descricao: data.descricao,
          ordem: data.ordem ?? 0,
          anexos: data.anexos ?? null,
          publico: data.publico ?? false,
          autor_id: data.autor_id, // <- isso aqui é essencial!
        },
      });

      callback(null, modulo);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, data, callback) => {
    try {
      const modulo = await prisma.modulo.update({
        where: { id : Number(id)},
        data: {
          slug: data.slug,
          titulo: data.titulo,
          descricao: data.descricao,
          ordem: data.ordem,
          anexos: data.anexos,
        },
      });
      callback(null, modulo);
    } catch (err) {
      callback(err);
    }
  },

  getAll: async (callback) => {
    try {
      const modulos = await prisma.modulo.findMany({
        orderBy: { ordem: "asc" },
      });
      callback(null, modulos);
    } catch (err) {
      callback(err);
    }
  },

  getById: async (id, callback) => {
    try {
      const modulo = await prisma.modulo.findUnique({
        where: { id : Number(id)},
        include: {
          conteudos: {
            orderBy: { ordem: "asc" },
            include: { artigo: true },
          },
        },
      });
      callback(null, modulo);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.modulo.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
};

const ModuloConteudo = {
  create: async (data, callback) => {
    try {
      const { titulo, descricao, ordem, modulo_id, artigo_id, video } = data;

      const conteudo = await prisma.moduloConteudo.create({
        data: {
          modulo_id: modulo_id,
          artigo_id: artigo_id || null,
          ordem: ordem,
          titulo_custom: titulo,
          descricao_custom: descricao,
          url_video: video,
        },
      });
      callback(null, conteudo);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, data, callback) => {
    try {
      const conteudo = await prisma.moduloConteudo.update({
        where: { id : Number(id)},
        data: {
          ordem: data.ordem,
          titulo_custom: data.titulo_custom,
          descricao_custom: data.descricao_custom,
          url_video: data.url_video,
        },
      });
      callback(null, conteudo);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.moduloConteudo.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },

  getAll: async (callback) => {
    try {
      const conteudos = await prisma.moduloConteudo.findMany({
        orderBy: { ordem: "asc" },
        include: { artigo: true },
      });
      callback(null, conteudos);
    } catch (err) {
      callback(err);
    }
  },

  getBymodulo_id: async (modulo_id, callback) => {
    try {
      const conteudos = await prisma.moduloConteudo.findMany({
        where: { modulo_id },
        orderBy: { ordem: "asc" },
        include: { artigo: true },
      });
      callback(null, conteudos);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = { Modulos, ModuloConteudo };
