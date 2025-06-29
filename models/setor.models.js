const Setor = require("../controllers/setor.controller");

exports.create = (req, res) => {
  Setor.create(req.body.nome, (err, setor_id) => {
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
  Setor.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Setor removido" });
  });
};
