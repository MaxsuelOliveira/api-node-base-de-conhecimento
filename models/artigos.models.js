const Artigos = require("../controllers/artigos.controller");

exports.create = (req, res) => {
  Artigos.create(
    {
      ...req.body,
      autor_id: req.user.id, // token decodificado
    },
    (err, result) => {
      if (err) {
        if (err.message === "Usuário (autor) não encontrado.")
          return res.status(400).send({ error: err.message });
        return res.status(500).send({ error: err.message });
      }
      res.status(201).send({
        message: "Artigos criado com sucesso",
        id: result.id,
      });
    }
  );
};

exports.getAll = (req, res) => {
  Artigos.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.getById = (req, res) => {
  Artigos.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send({ message: "Artigos não encontrado" });
    res.send(row);
  });
};

exports.delete = (req, res) => {
  Artigos.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: "Artigos deletado com sucesso" });
  });
};
