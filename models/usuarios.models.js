const Usuarios = require("../controllers/usuarios.controller");

exports.create = (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });
  }

  Usuarios.create(req.body, (err, usuario) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  });
};

exports.getAll = (req, res) => {
  Usuarios.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do usuário não fornecido" });
  }

  Usuarios.getById(id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row)
      return res.status(404).send({ message: "Usuário não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do usuário não fornecido" });
  }

  if (req.user.id === id) {
    return res.status(400).send({ error: "Você não pode remover a si mesmo" });
  }

  Usuarios.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Usuário removido" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID do usuário não fornecido" });
  }

  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .send({ error: "Campos obrigatórios não preenchidos" });
  }

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
