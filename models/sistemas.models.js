const Sistemas = require("../controllers/sistemas.controller");

exports.create = (req, res) => {
  Sistemas.create(req.body.nome, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: "Sistema criado" });
  });
};

exports.getAll = (req, res) => {
  Sistemas.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.delete = (req, res) => {
  Sistemas.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Sistema removido" });
  });
};

exports.getById = (req, res) => {
  Sistemas.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Sistema não encontrado" });
    res.send(row);
  });
};

exports.getBySetor = (req, res) => {
  Sistemas.getBySetor(req.params.setor_id, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    if (!rows || rows.length === 0)
      return res
        .status(404)
        .send({ message: "Nenhum sistema encontrado para este setor" });
    res.send(rows);
  });
};
