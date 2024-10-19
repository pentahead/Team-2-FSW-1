const { successResponse } = require("../utils/response");
const availableService = require("../services/availablesService");

exports.getAvailable = async (req, res, next) => {
  const data = await availableService.getAvailable();
  successResponse(res, data);
};

exports.createAvailable = async (req, res, next) => {
  const data = await availableService.createAvailable(req.body);
  successResponse(res, data);
};

exports.updateAvailable = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }
    const data = await availableService.updateAvailable(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deleteAvailableById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }
    const data = await availableService.deleteAvailableById(id);
    successResponse(res, data);
  } catch (error) {
    next(error); 
  }
};
