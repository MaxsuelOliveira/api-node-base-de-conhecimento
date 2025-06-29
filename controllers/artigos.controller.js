const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Artigos = {
  
  create: async (data, callback) => {
    try {
      console.log("Dados recebidos para criação do artigo:", data);

      const {
        slug,
        titulo,
        setor_id,
        categoria_id,
        descricao,
        anexo,
        link,
        conteudo_html,
        publico,
        autor_id, // ✅ ID do usuário logado vem no data
      } = data;

      const usuario = await prisma.usuarios.findUnique({
        where: { id: autor_id },
        select: { nome: true },
      });

      if (!usuario) {
        return callback(new Error("Usuário (autor) não encontrado."));
      }

      // Verificar se a categoria e setor existem
      const setor = await prisma.setor.findUnique({
        where: { id: setor_id },
      });
      if (!setor) {
        return callback(new Error("Setor não encontrado."));
      }
      const categoria = await prisma.categorias.findUnique({
        where: { id: categoria_id },
      });
      if (!categoria) {
        return callback(new Error("Categorias não encontrada."));
      }

      const artigoCriado = await prisma.artigos.create({
        data: {
          slug: slug || titulo.toLowerCase().replace(/\s+/g, "-"),
          titulo,
          setor_id: setor_id,
          categoria_id: categoria_id,
          descricao,
          anexo,
          link,
          conteudo_html: conteudo_html,
          date_created: new Date(),
          autor_id: autor_id,
          publico: publico ?? true,
        },
      });

      callback(null, { id: artigoCriado.id });
    } catch (error) {
      callback(error);
    }
  },

  getAll: async (callback) => {
    try {
      const artigos = await prisma.artigos.findMany({
        include: {
          setor: true,
          categoria: true,
          autor: true,
        },
      });

      // Se quiser renomear os campos como no SQLite:
      const artigosFormatados = artigos.map((a) => ({
        ...a,
        setor_nome: a.setor?.nome,
        categoria_nome: a.categoria?.nome,
        autor_nome: a.autor?.nome,
      }));

      callback(null, artigosFormatados);
    } catch (error) {
      callback(error);
    }
  },

  getById: async (id, callback) => {
    try {
      const artigo = await prisma.artigos.findUnique({
        where: { id },
        include: {
          setor: true,
          categoria: true,
          autor: true,
        },
      });

      if (!artigo) return callback(null, null);

      const artigoFormatado = {
        ...artigo,
        setor_nome: artigo.setor?.nome,
        categoria_nome: artigo.categoria?.nome,
        autor_nome: artigo.autor?.nome,
      };

      callback(null, artigoFormatado);
    } catch (error) {
      callback(error);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.artigos.delete({
        where: { id },
      });
      callback(null);
    } catch (error) {
      callback(error);
    }
  },
};

module.exports = Artigos;
