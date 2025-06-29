const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios.controller').Usuarios;

router.post('/', (req, res) => {
  const { email, senha } = req.body;
  Usuarios.login(email, senha, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json(result); 
  });
});

module.exports = router;