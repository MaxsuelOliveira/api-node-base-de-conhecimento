const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Recompensa = {

  create: async (data, callback) => {
    try {
      const recompensa = await prisma.recompensa.create({ data });
      callback(null, recompensa);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, data, callback) => {
    try {
      const recompensa = await prisma.recompensa.update({
        where: { id : Number(id)},
        data,
      });
      callback(null, recompensa);
    } catch (err) {
      callback(err);
    }
  },

  getAll: async (callback) => {
    try {
      const recompensas = await prisma.recompensa.findMany({
        orderBy: { id: 'desc' },
      });
      callback(null, recompensas);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.recompensa.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

};

const UsuarioRecompensa = {
  
  atribuir: async (data, callback) => {
    try {
      const recebida = await prisma.usuarioRecompensa.create({ data });
      callback(null, recebida);
    } catch (err) {
      callback(err);
    }
  },

  getByUsuario: async (usuario_id, callback) => {
    try {
      const lista = await prisma.usuarioRecompensa.findMany({
        where: { usuario_id },
        include: { recompensa: true },
        orderBy: { data_recebida: 'desc' },
      });
      callback(null, lista);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, data, callback) => {
    try {
      const atualizado = await prisma.usuarioRecompensa.update({
        where: { id : Number(id)},
        data,
      });
      callback(null, atualizado);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = { Recompensa, UsuarioRecompensa };