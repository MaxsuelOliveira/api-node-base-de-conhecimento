const Categorias = require('../controllers/categorias.controller');

exports.create = (req, res) => {
  const { nome, setor_id } = req.body;
  console.log("Dados recebidos para criação da categoria:", { nome, setor_id });
  Categorias.create(nome, setor_id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ message: 'Categorias criada' });
  });
};

exports.getAll = (req, res) => {
  Categorias.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

exports.delete = (req, res) => {
  Categorias.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.send({ message: 'Categorias removida' });
  });
};

exports.getBySetor = (req, res) => {
  const setor_id = req.params.setor_id;
  Categorias.getBySetor(setor_id, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
}