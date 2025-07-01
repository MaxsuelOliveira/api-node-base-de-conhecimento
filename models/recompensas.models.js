const Recompensas = require("../controllers/recompensas.controller");

exports.create = (req, res) => {
  const data = req.body;

  const { nome, descricao, pontos } = data;

  if (!nome || !descricao || !pontos) {
    return res
      .status(400)
      .send({ error: "Campos obrigatórios não preenchidos" });
  }

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
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da recompensa não fornecido" });
  }

  Recompensas.getById(id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Recompensa não encontrada" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da recompensa não fornecido" });
  }

  Recompensas.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Recompensa removida" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID da recompensa não fornecido" });
  }

  Recompensas.update(id, req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Recompensa atualizada" });
  });
};
