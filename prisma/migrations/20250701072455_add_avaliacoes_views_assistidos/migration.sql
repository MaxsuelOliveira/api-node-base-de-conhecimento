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
CREATE UNIQUE INDEX "VideoAssistido_usuario_id_conteudo_id_key" ON "VideoAssistido"("usuario_id", "conteudo_id");

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "modulo_conteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoAssistido" ADD CONSTRAINT "VideoAssistido_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoAssistido" ADD CONSTRAINT "VideoAssistido_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "modulo_conteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_artigo_id_fkey" FOREIGN KEY ("artigo_id") REFERENCES "Artigos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "Modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "modulo_conteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
