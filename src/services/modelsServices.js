const modelRepository = require("../repositories/modelsRepository");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModels = async (model, capacity) => {
  return modelRepository.getModels(model, capacity);
};

exports.getModelById = async (id) => {
  const model = await modelRepository.getModelById(id);
  if (!model) {
    throw new NotFoundError("Model is Not Found!");
  }

  return model;
};

exports.createModel = async (data, file) => {
  // Create the data
  return modelRepository.createModel(data);
};

exports.updateModel = async (id, data, file) => {
  // find model is exist or not (validate the data)
  const existingModel = modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingModel, // existing Model
    ...data,
  };

  // if exist, we will update the model data
  const updatedModel = modelRepository.updateModel(id, data);
  if (!updatedModel) {
    throw new InternalServerError(["Failed to update model!"]);
  }

  return updatedModel;
};

exports.deleteModelById = async (id) => {
  // Find model by id (async)
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }

  // If the model exists, delete the model (async)
  const deletedModel = await modelRepository.deleteModelById(id);
  if (!deletedModel) {
    throw new InternalServerError(["Failed to delete model!"]);
  }

  // Return the deleted model data
  return existingModel;
};
