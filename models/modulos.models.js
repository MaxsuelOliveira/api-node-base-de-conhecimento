const Modulos = require("../controllers/modulos.controller");

exports.create = (req, res) => {
  const data = req.body;

  const { nome, setor_id } = data;

  if ((!nome, setor_id)) {
    return res.status(400).send({ error: "Nome do módulo é obrigatório" });
  }

  Modulos.create(data, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: "Módulo criado" });
  });
};

exports.getAll = (req, res) => {
  Modulos.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da categoria não fornecido" });
  }

  Modulos.getById(id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send({ message: "Módulo não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da categoria não fornecido" });
  }

  Modulos.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Módulo removido" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do módulo não fornecido" });
  }

  Modulos.update(id, req.body.nome, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Módulo atualizado" });
  });
};
