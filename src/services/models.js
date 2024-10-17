const modelRepository = require("../repositories/models");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.createModel = async (data, file) => {
  return modelRepository.createModel(data);
};
