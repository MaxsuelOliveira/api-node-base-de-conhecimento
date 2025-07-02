const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Categorias = {
  create: async (nome, setor_id, callback) => {
    try {
      // Verifica se o setor existe
      const setorExiste = await prisma.setor.findUnique({
        where: { id: setor_id }
      });

      if (!setorExiste) {
        return callback(new Error("Setor não encontrado."));
      }

      // Cria a categoria com setor_id válido
      const novaCategoria = await prisma.categoria.create({
        data: {
          nome,
          setor_id
        }
      });

      callback(null, novaCategoria);
    } catch (error) {
      callback(error);
    }
  },

  getAll: async (callback) => {
    try {
      const categorias = await prisma.categoria.findMany({
        include: {
          setor: {
            select: { nome: true },
          },
        },
      });

      // Formata saída compatível
      const formatado = categorias.map((c) => ({
        ...c,
        setor_nome: c.setor?.nome,
      }));

      callback(null, formatado);
    } catch (err) {
      callback(err);
    }
  },

  getBySetor: async (setor_id, callback) => {
    try {
      const categorias = await prisma.categoria.findMany({
        where: { setor_id },
      });
      callback(null, categorias);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.categoria.delete({
        where: { id: Number(id) },
      });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = Categorias;
