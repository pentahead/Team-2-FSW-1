const carsService = require("../services/Service");
const { successResponse } = require("../utils/response");

exports.get = async () => {};
exports.getByID = async () => {};
exports.createCar = async (req, res, next) => {
  const data = await carsService.createCar(req.body);
  successResponse(res, data);
};
exports.updateById = async () => {};
exports.deleteById = async () => {};
