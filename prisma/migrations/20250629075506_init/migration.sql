-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "setor_id" INTEGER NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artigos" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT,
    "descricao" TEXT,
    "conteudo_html" TEXT,
    "link" TEXT,
    "anexo" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL,
    "setor_id" INTEGER,
    "categoria_id" INTEGER,
    "autor_id" INTEGER NOT NULL,
    "publico" BOOLEAN NOT NULL,

    CONSTRAINT "Artigos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulos" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "anexos" TEXT,
    "publico" BOOLEAN NOT NULL,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "Modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulo_conteudo" (
    "id" SERIAL NOT NULL,
    "modulo_id" INTEGER NOT NULL,
    "artigo_id" INTEGER,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "titulo_custom" TEXT,
    "descricao_custom" TEXT,
    "url_video" TEXT,

    CONSTRAINT "modulo_conteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_modulo" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "modulo_id" INTEGER NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,
    "atribuido_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recompensa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Recompensa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRecompensa" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "recompensa_id" INTEGER NOT NULL,
    "data_recebida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregue" BOOLEAN NOT NULL DEFAULT false,
    "observacao" TEXT,

    CONSTRAINT "UsuarioRecompensa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artigos_slug_key" ON "Artigos"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Modulos_slug_key" ON "Modulos"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_modulo_usuario_id_modulo_id_key" ON "usuario_modulo"("usuario_id", "modulo_id");

-- AddForeignKey
ALTER TABLE "Categorias" ADD CONSTRAINT "Categorias_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "Setor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulos" ADD CONSTRAINT "Modulos_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_conteudo" ADD CONSTRAINT "modulo_conteudo_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_conteudo" ADD CONSTRAINT "modulo_conteudo_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_modulo" ADD CONSTRAINT "usuario_modulo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_modulo" ADD CONSTRAINT "usuario_modulo_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRecompensa" ADD CONSTRAINT "UsuarioRecompensa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRecompensa" ADD CONSTRAINT "UsuarioRecompensa_recompensa_id_fkey" FOREIGN KEY ("recompensa_id") REFERENCES "Recompensa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
