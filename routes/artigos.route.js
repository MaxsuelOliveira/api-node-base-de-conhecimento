const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const controller = require("../models/artigos.models");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/setor/:setor_id", controller.getBySetor);
router.get("/categoria/:categoria_id", controller.getByCategoria);
router.post("/", auth, is_admin, controller.create);
router.delete("/:id", auth, is_admin, controller.delete);
router.put("/:id", auth, is_admin, controller.update);

module.exports = router;
