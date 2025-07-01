const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Sistemas = {
  getAll: async (callback) => {
    try {
      const sistemas = await prisma.sistema.findMany({
        orderBy: { nome: "asc" },
      });
      callback(null, sistemas);
    } catch (err) {
      callback(err);
    }
  },

  getById: async (id, callback) => {
    try {
      const sistema = await prisma.sistema.findUnique({
        where: { id : Number(id)},
        include: {
          modulos: {
            orderBy: { ordem: "asc" },
            include: {
              conteudos: {
                orderBy: { ordem: "asc" },
              },
            },
          },
        },
      });
      callback(null, sistema);
    } catch (err) {
      callback(err);
    }
  },

  create: async (data, userId, callback) => {
    try {
      const sistema = await prisma.sistema.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          ativo: data.ativo ?? true,
          autor: {
            connect: { id: userId }, // Associa o usuário logado como autor
          },
        },
      });
      callback(null, sistema);
    } catch (error) {
      callback(error);
    }
  },

  update: async (id, data, callback) => {
    try {
      const sistema = await prisma.sistema.update({
        where: { id : Number(id)},
        data: {
          nome: data.nome,
          descricao: data.descricao,
          ativo: data.ativo,
        },
      });
      callback(null, sistema);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.sistema.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = Sistemas;