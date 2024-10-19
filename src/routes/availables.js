const express = require("express");
const {
  validateGetAvailable,
  validateGetAvailableById,
  validateDeleteAvailableById,
  validateCreateAvailable,
  validateUpdateAvailable,
} = require("../middlewares/availablesValidation"); 
const {
  getAvailable,
  getAvailableById,
  deleteAvailableById,
  createAvailable,
  updateAvailable,
} = require("../controllers/availablesController"); 

const router = express.Router();

router.get("/", getAvailable);
router.post("/", validateCreateAvailable, createAvailable);
// router.get("/:id", validateGetAvailableById, getAvailableById);
router.put("/:id", validateUpdateAvailable, updateAvailable);
router.delete("/:id", validateDeleteAvailableById, deleteAvailableById);

module.exports = router;
