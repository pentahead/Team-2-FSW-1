const express = require("express");
const {
  validateGetTypes, 
  validateGetTypeById, 
  validateDeleteTypeById, 
  validateCreateType, 
  validateUpdateType,
} = require("../middlewares/typesValidatiion"); 
const {
  getTypes,
  getTypeById,
  deleteTypeById, 
  createType, 
  updateType, 
} = require("../controllers/typesController");

const router = express.Router();

router.get("/", getTypes); 
// router.get("/search", validateGetTypes, getTypes); 
router.post("/", validateCreateType, createType); 
// router.get("/:id", validateGetTypeById, getTypeById); 
router.put("/:id", validateUpdateType, updateType);
router.delete("/:id", validateDeleteTypeById, deleteTypeById);

module.exports = router;
