import express from "express";
import { articles } from "./articles.js";
import { templateSeo, notFound } from "./seoHelpers.js";

const app = express();
const PORT = 3001;

app.use(express.static("public"));

app.get("/share/:slug", (req, res) => {
  const { slug } = req.params;
  const artigo = articles.find((a) => a.slug === slug);

  if (!artigo) {
    return notFound(res);
  }

  return templateSeo(res, artigo);
});

app.listen(PORT, () =>
  console.log(`✅ SEO server rodando em: http://localhost:${PORT}/share/:slug`)
);
