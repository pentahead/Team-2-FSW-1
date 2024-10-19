const { successResponse } = require("../utils/response");
const manufactureService = require("../services/manufacturesService");

exports.getManufactures = async (req, res, next) => {
  const data = await manufactureService.getManufactures(
    req.query?.manufacture_name,
    req.query?.manufacture_region,
    req.query?.year_establish
  );

  successResponse(res, data);
};

exports.getManufactureById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await manufactureService.getManufactureById(id);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.createManufacture = async (req, res, next) => {
  const data = await manufactureService.createManufacture(req.body, req.files);
  successResponse(res, data);
};

exports.updateManufacture = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }
    const data = await manufactureService.updateManufacture(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deleteManufactureById = (req, res, next) => {
  const { id } = req.params;
  const data = manufactureService.deleteManufactureById(id);
  successResponse(res, data);
};
