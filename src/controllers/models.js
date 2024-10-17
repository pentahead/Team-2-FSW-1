const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

exports.createModel = async (req, res, next) => {
  const data = await modelService.createModel(req.body, req.files);
  successResponse(res, data);
};

exports.updateModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body, req.files);
  successResponse(res, data);
};
