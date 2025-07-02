const Artigos = require("../controllers/artigos.controller");

exports.create = (req, res) => {
  const {
    slug,
    titulo,
    setor_id,
    categoria_id,
    descricao,
    anexo,
    link,
    conteudo_html,
    publico,
  } = req.body;

  if (
    !slug ||
    !titulo ||
    !setor_id ||
    !categoria_id ||
    !descricao ||
    !anexo ||
    !link
  ) {
    return res
      .status(400)
      .send({ error: "Campos obrigatórios não preenchidos" });
  }

  Artigos.create(
    {
      ...req.body,
      autor_id: req.user.id, // token decodificado
    },
    (err, result) => {
      if (err) {
        if (err.message === "Usuário (autor) não encontrado.")
          return res.status(400).send({ error: err.message });
        return res.status(500).send({ error: err.message });
      }
      res.status(201).send({
        message: "Artigos criado com sucesso",
        id: result.id,
      });
    }
  );
};

exports.getAll = (req, res) => {
  Artigos.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getBySetor = (req, res) => {
  const { setor_id } = req.params;
  if (!setor_id) {
    return res.status(400).send({ error: "ID do setor não fornecido" });
  }

  Artigos.getBySetor(setor_id, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    if (rows.length === 0)
      return res.status(404).send({ message: "Artigos não encontrado" });
    res.send(rows);
  });
};

exports.getByCategoria = (req, res) => {
  const { categoria_id } = req.params;
  if (!categoria_id) {
    return res.status(400).send({ error: "ID da categoria não fornecido" });
  }

  Artigos.getByCategoria(categoria_id, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    if (rows.length === 0)
      return res.status(404).send({ message: "Artigos não encontrado" });
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do artigo não fornecido" });
  }

  Artigos.getById(id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Artigos não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "ID do artigo não fornecido" });
  }

  Artigos.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Artigos deletado com sucesso" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do artigo não fornecido" });
  }

  const {
    slug,
    titulo,
    setor_id,
    categoria_id,
    descricao,
    anexo,
    link,
    publico,
  } = req.body;

  if (!titulo) {
    return res
      .status(400)
      .send({ error: "Campos obrigatórios não preenchidos" });
  }

  if (!setor_id) {
    return res.status(400).send({ error: "Setor ID não fornecido" });
  }

  if (!categoria_id) {
    return res.status(400).send({ error: "Categoria ID não fornecido" });
  }

  if (!descricao) {
    return res.status(400).send({ error: "Descrição não fornecida" });
  }

  if (!link) {
    return res.status(400).send({ error: "Link não fornecido" });
  }

  Artigos.update(id, req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Artigos atualizado com sucesso" });
  });
};
