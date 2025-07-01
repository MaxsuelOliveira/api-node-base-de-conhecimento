const Setor = require("../controllers/setor.controller");

exports.create = (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).send({ error: "Nome do setor é obrigatório" });
  }

  Setor.create(nome, (err, setor_id) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: setor_id });
  });
};

exports.getAll = (req, res) => {
  Setor.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do setor não fornecido" });
  }

  Setor.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Setor removido" });
  });
};
