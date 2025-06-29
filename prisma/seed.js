// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { md5Hash } = require("../utils/jwt.js");

async function main() {
  const email = "admin@admin.com";
  const senha = "senha123";

  const senhaHash = md5Hash(senha);

  const exists = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (!exists) {
    await prisma.usuarios.create({
      data: {
        nome: "Administrador",
        email,
        senha: senhaHash,
        is_admin: true, // Define como admin
      },
    });
    console.log("Usuário admin criado.");
  } else {
    console.log("Usuário admin já existe.");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
