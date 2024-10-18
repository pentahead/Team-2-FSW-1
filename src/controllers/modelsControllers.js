const modelService = require("../services/modelsServices");
const { successResponse } = require("../utils/response");

exports.getModels = async (req, res, next) => {
  // Call the usecase or service
  const data = await modelService.getModels(
    req.query?.model_name,
    req.query?.capacity
  );
  successResponse(res, data);
};

exports.getModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get model by id
  const data = await modelService.getModelById(id);
  successResponse(res, data);
};

exports.createModel = async (req, res, next) => {
  // Create the new model
  const data = await modelService.createModel(req.body, req.files);
  successResponse(res, data);
};

exports.updateModel = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteModelById = async (req, res, next) => {
  const { id } = req.params;

  const deletedModel = await modelService.deleteModelById(id);

  // Respond with success and the deleted model data
  successResponse(res, {
    message: "Model deleted successfully",
    deletedModel,
  });
};
