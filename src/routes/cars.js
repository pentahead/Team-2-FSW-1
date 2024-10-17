const express = require("express");
const  carController = require("../controllers/carController");
const  carValidation = require("../middlewares/carValidation");

const router = express.Router();

router
  .route("/")
  .post(carValidation.validateCreateCar, carController.createCar);
router
  // .route("/:id")
  // .get()
  // .put()
  // .delete();

module.exports = router;
