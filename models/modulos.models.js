const Modulos = require("../controllers/modulos.controller");

exports.create = (req, res) => {
  const data = req.body;

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
  Modulos.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send({ message: "Módulo não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  Modulos.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Módulo removido" });
  });
};

exports.update = (req, res) => {
  Modulos.update(req.params.id, req.body.nome, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Módulo atualizado" });
  });
};