const express = require("express");
const router = express.Router();
const { auth, is_admin } = require("../middlewares/auth");
const controller = require("../models/setor.models");

router.get("/", controller.getAll);
router.post("/", auth, is_admin, controller.create);
router.delete("/:id", auth, is_admin, controller.delete);

module.exports = router;
