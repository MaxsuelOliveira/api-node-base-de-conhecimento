-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "setor_id" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
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
    "date_updated" TIMESTAMP(3),
    "setor_id" INTEGER,
    "categoria_id" INTEGER,
    "autor_id" INTEGER NOT NULL,
    "publico" BOOLEAN NOT NULL,

    CONSTRAINT "Artigos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sistemas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "Sistemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "anexos" TEXT,
    "publico" BOOLEAN NOT NULL,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuloConteudo" (
    "id" SERIAL NOT NULL,
    "modulo_id" INTEGER NOT NULL,
    "artigo_id" INTEGER,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "titulo_custom" TEXT,
    "descricao_custom" TEXT,
    "url_video" TEXT,

    CONSTRAINT "ModuloConteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioModulo" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "modulo_id" INTEGER NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,
    "atribuido_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsuarioModulo_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "artigo_id" INTEGER,
    "modulo_id" INTEGER,
    "conteudo_id" INTEGER,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoAssistido" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "conteudo_id" INTEGER NOT NULL,
    "visto_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoAssistido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewCount" (
    "id" SERIAL NOT NULL,
    "artigo_id" INTEGER,
    "modulo_id" INTEGER,
    "conteudo_id" INTEGER,
    "total_views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artigos_slug_key" ON "Artigos"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Modulo_slug_key" ON "Modulo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioModulo_usuario_id_modulo_id_key" ON "UsuarioModulo"("usuario_id", "modulo_id");

-- CreateIndex
CREATE UNIQUE INDEX "VideoAssistido_usuario_id_conteudo_id_key" ON "VideoAssistido"("usuario_id", "conteudo_id");

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "Setor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sistemas" ADD CONSTRAINT "Sistemas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo" ADD CONSTRAINT "Modulo_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuloConteudo" ADD CONSTRAINT "ModuloConteudo_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuloConteudo" ADD CONSTRAINT "ModuloConteudo_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioModulo" ADD CONSTRAINT "UsuarioModulo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioModulo" ADD CONSTRAINT "UsuarioModulo_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRecompensa" ADD CONSTRAINT "UsuarioRecompensa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRecompensa" ADD CONSTRAINT "UsuarioRecompensa_recompensa_id_fkey" FOREIGN KEY ("recompensa_id") REFERENCES "Recompensa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "ModuloConteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoAssistido" ADD CONSTRAINT "VideoAssistido_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoAssistido" ADD CONSTRAINT "VideoAssistido_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "ModuloConteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "ModuloConteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
