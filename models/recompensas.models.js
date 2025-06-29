const Recompensas = require("../controllers/recompensas.controller");

exports.create = (req, res) => {
  const data = req.body;

  Recompensas.create(data, req.user.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: "Recompensa criada" });
  });
};

exports.getAll = (req, res) => {
  Recompensas.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  Recompensas.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Recompensa não encontrada" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  Recompensas.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Recompensa removida" });
  });
};

exports.update = (req, res) => {
  Recompensas.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Recompensa atualizada" });
  });
};
