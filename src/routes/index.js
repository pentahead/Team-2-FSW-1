const express = require("express");
const carRouter = require("./cars");
const optionsRouter = require("./options");
const modelsRouter = require("./models");
const specsRouter = require("./specs");

const router = express.Router();

router.use("/cars", carRouter);
router.use("/options", optionsRouter);
router.use("/models", modelsRouter);
router.use("/specs", specsRouter);
module.exports = router;
