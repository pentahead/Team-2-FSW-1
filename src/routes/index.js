const express = require("express");
const carRouter = require("../routes/cars");

const router = express.Router();

router.use("/cars", carRouter);

module.exports = router;
