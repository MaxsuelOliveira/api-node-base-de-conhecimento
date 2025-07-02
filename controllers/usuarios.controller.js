const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken, md5Hash } = require("../utils/jwt"); // Importa a função de geração de token

const Usuarios = {
  getAll: async (callback) => {
    try {
      const usuarios = await prisma.usuarios.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          criado_em: true,
          atualizado_em: true,
        },
      });
      callback(null, usuarios);
    } catch (err) {
      callback(err);
    }
  },

  getById: async (id, callback) => {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: { id : Number(id)},
        select: {
          id: true,
          nome: true,
          email: true,
          criado_em: true,
          atualizado_em: true,
          is_admin: true,
          permissao: true,
        },
      });
      if (!usuario) return callback(new Error("Usuário não encontrado"));
      callback(null, usuario);
    } catch (err) {
      callback(err);
    }
  },

  login: async (email, senha, callback) => {
    try {
      const usuario = await prisma.usuarios.findUnique({ where: { email } });
      if (!usuario) return callback(null, null);

      const senhaHash = md5Hash(senha);
      if (senhaHash !== usuario.senha) return callback(null, null);

      // Retorna apenas os dados do usuário, sem token
      callback(null, {
        user: {
          nome: usuario.nome,
          email: usuario.email,
          is_admin: usuario.is_admin,
        },
        token: generateToken(usuario),
      });
    } catch (err) {
      callback(err);
    }
  },

  create: async (data, callback) => {
    try {
      // Verifica se já existe um usuário com o mesmo email
      const usuarioExistente = await prisma.usuarios.findUnique({
        where: { email: data.email },
      });

      if (usuarioExistente) {
        return callback(new Error("Usuário com este email já existe"));
      }

      const hashedPassword = md5Hash(data.senha);
      const usuario = await prisma.usuarios.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: hashedPassword,
        },
      });
      callback(null, usuario);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      await prisma.usuarios.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, data, callback) => {
    try {
      // Verifica se o email já está em uso por outro usuário
      if (data.email) {
        const usuarioExistente = await prisma.usuarios.findFirst({
          where: { email: data.email, id: { not: id } },
        });

        if (usuarioExistente) {
          return callback(new Error("Email já está em uso por outro usuário"));
        }
      }

      const usuario = await prisma.usuarios.update({
        where: { id : Number(id)},
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha ? md5Hash(data.senha) : undefined, // Atualiza a senha apenas se fornecida
        },
      });
      callback(null, usuario);
    } catch (err) {
      callback(err);
    }
  },

  findByEmail: async (email, callback) => {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: { email },
      });
      callback(null, !!usuario); // Retorna true se o usuário existir, false caso contrário
    } catch (err) {
      callback(err);
    }
  },
};

const UsuarioModulo = {
  // Atribuir módulo para usuário
  assignModulo: async (data, callback) => {
    // data: { usuario_id, modulo_id, obrigatorio (bool) }
    try {
      const atribuido = await prisma.UsuarioModulo.create({
        data: {
          usuario_id: data.usuario_id,
          modulo_id: data.modulo_id,
          obrigatorio: data.obrigatorio || false,
          concluido: false,
        },
      });
      callback(null, atribuido);
    } catch (err) {
      callback(err);
    }
  },

  // Atualizar status concluído e/ou obrigatorio
  updateStatus: async (id, data, callback) => {
    try {
      const atualizado = await prisma.UsuarioModulo.update({
        where: { id : Number(id)},
        data: {
          concluido: data.concluido,
          obrigatorio: data.obrigatorio,
        },
        include: {
          modulo: true,
          usuario: true,
        },
      });

      // Se marcou como concluído, atribui recompensa automaticamente
      if (data.concluido) {
        const recompensa = await prisma.recompensa.findFirst({
          where: {
            tipo: "certificado", // ou 'pontos', 'badge', conforme sua lógica
            ativo: true,
          },
        });

        if (recompensa) {
          await prisma.usuarioRecompensa.upsert({
            where: {
              usuario_id_recompensa_id: {
                usuario_id: atualizado.usuario_id,
                recompensa_id: recompensa.id,
              },
            },
            update: {},
            create: {
              usuario_id: atualizado.usuario_id,
              recompensa_id: recompensa.id,
              observacao: `Concluiu o módulo: ${atualizado.modulo.titulo}`,
              entregue: true,
            },
          });
        }
      }

      callback(null, atualizado);
    } catch (err) {
      callback(err);
    }
  },

  // Listar módulos de um usuário (com status)
  getModulosByUsuario: async (usuario_id, callback) => {
    try {
      const modulos = await prisma.UsuarioModulo.findMany({
        where: { usuario_id },
        include: {
          modulo: true,
        },
        orderBy: {
          modulo: { ordem: "asc" },
        },
      });
      callback(null, modulos);
    } catch (err) {
      callback(err);
    }
  },

  // Remover módulo atribuído ao usuário
  removeModulo: async (id, callback) => {
    try {
      await prisma.UsuarioModulo.delete({ where: { id } });
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = { Usuarios, UsuarioModulo };
