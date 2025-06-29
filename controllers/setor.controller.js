const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Setor = {

  create: async (nome, callback) => {
    try {
      const setor = await prisma.setor.create({
        data: { nome },
      });
      callback(null, setor);
    } catch (err) {
      callback(err);
    }
  },

  getAll: async (callback) => {
    try {
      const setores = await prisma.setor.findMany();
      callback(null, setores);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.setor.delete({
        where: { id },
      });
      callback(null);
    } catch (err) {
      callback(err);
    }
  }
  
};

module.exports = Setor;
