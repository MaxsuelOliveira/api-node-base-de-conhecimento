const Usuarios = require("../controllers/usuarios.controller");

exports.create = (req, res) => {
  const data = req.body;

  Usuarios.create(data, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: "Usuário criado" });
  });
};

exports.getAll = (req, res) => {
  Usuarios.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  Usuarios.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Usuário não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  Usuarios.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Usuário removido" });
  });
};

exports.update = (req, res) => {
  Usuarios.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Usuário atualizado" });
  });
};

exports.getByEmail = (req, res) => {
  Usuarios.getByEmail(req.params.email, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Usuário não encontrado" });
    res.send(row);
  });
};