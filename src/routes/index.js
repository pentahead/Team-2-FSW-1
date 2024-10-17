const express = require("express");
const modelsRouter = require("./models");

const router = express.Router();

router.use("/models", modelsRouter);

module.exports = router;
