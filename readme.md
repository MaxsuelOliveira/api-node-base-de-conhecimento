# 📚 API - Base de Conhecimento (Vídeos e Artigos)

Este repositório contém a **API (backend)** da aplicação de Base de Conhecimento, responsável por gerenciar autores, setores, categorias e artigos (em vídeo ou texto). Esta solução é ideal para organizações que desejam centralizar conteúdos de aprendizado e informação interna.

---

## 🚀 Funcionalidades

- Cadastro de autores, setores e categorias.
- Publicação de artigos em texto ou vídeo.
- Controle de usuários administradores com autenticação JWT.
- Banco de dados Oracle via Docker + Prisma.
- Total integração com frontend via endpoints RESTful.

---

## 🧰 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **Oracle Database (via Docker)**
- **JWT** para autenticação
- **Bcrypt** para hash de senhas
- **Dotenv** para variáveis de ambiente

---

## 🐘 Banco de Dados com Docker (Oracle 21c)

Para rodar o Oracle via Docker, use o seguinte comando:

```bash
docker-compose up -d
```

> O banco será iniciado com usuário, senha e banco padrão: `oracle`

---

## 📦 Instalação do Projeto

```bash
git clone https://github.com/seu-usuario/base-conhecimento-backend.git
cd base-conhecimento-backend
npm install
```

---

## ⚙️ Configuração do `.env`

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
PORT=3000
HOST=localhost
DATABASE_URL="oracle://oracle:oracle@localhost:1521/oracle"
JWT_SECRET="sua_chave_secreta_super_segura"
```

---

## 🔄 Prisma ORM

Como o Oracle não suporta `prisma migrate`, use o comando:

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## 🧪 Seed - Criar Usuário Admin

Cria um usuário padrão para login:

```bash
node prisma/seed.js
```

Credenciais:

- **Email:** admin@admin.com  
- **Senha:** senha123

---

## ▶️ Executando o Projeto

```bash
npm run dev
```

---

## 🔐 Autenticação JWT

Todas as rotas são protegidas. Envie o token JWT no header da requisição:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📁 Endpoints e Exemplos (Postman)

Coleção com exemplos práticos de uso da API disponível no Postman:

[👉 Acessar Coleção](https://elements.getpostman.com/redirect?entityId=17594781-7c9d4b48-77d6-4a73-8cc1-c18953a3ac78&entityType=collection)

---

## 👤 Autor

**Maxsuel Oliveira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MaxsuelOliveira)
[![Rocketseat](https://img.shields.io/badge/Rocketseat-7159c1?style=for-the-badge&logo=rocketseat&logoColor=white)](https://app.rocketseat.com.br/me/md-04583)

---

## 📌 Observações Finais

- Este projeto representa apenas o **backend**.
- O frontend deverá consumir esta API REST para exibir os conteúdos.
- Em ambientes de produção, utilize variáveis seguras e evite o uso de `db push`.