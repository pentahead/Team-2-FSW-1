const carRepository = require("../repositories/carRepository");
const { imageUpload, imageDelete } = require("../utils/image-kit");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.get = async () => {};
exports.getByID = async () => {};
exports.createCar = async (data) => {
  return carRepository.createCar(data);
};
exports.updateById = async () => {};
exports.deleteById = async () => {};
