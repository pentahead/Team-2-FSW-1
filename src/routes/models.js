const express = require("express");
const { validateCreateModel } = require("../middlewares/models");
const { createModel } = require("../controllers/models");

const router = express.Router();

router.route("/").post(validateCreateModel, createModel);

router.route("/:id");

module.exports = router;
