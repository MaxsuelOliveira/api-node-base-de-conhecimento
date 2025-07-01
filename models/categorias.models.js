const Categorias = require("../controllers/categorias.controller");

exports.create = (req, res) => {
  const { nome, setor_id } = req.body;

  if (!nome || !setor_id) {
    return res
      .status(400)
      .send({ error: "Campos obrigatórios não preenchidos" });
  }

  Categorias.create(nome, setor_id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: "Categorias criada" });
  });
};

exports.getAll = (req, res) => {
  Categorias.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da categoria não fornecido" });
  }

  Categorias.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Categorias removida" });
  });
};

exports.getBySetor = (req, res) => {
  const setor_id = req.params.setor_id;

  if (!setor_id) {
    return res.status(400).send({ error: "ID do setor não fornecido" });
  }

  Categorias.getBySetor(setor_id, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};
