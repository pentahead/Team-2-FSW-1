const specRepository = require("../repositories/specsRepository");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getSpecs = async (spec_name) => {
  return specRepository.getSpecs(spec_name);
};

exports.getSpecById = async (id) => {
  const spec = await specRepository.getSpecById(id);
  if (!spec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  return spec;
};

exports.createSpec = async (data, file) => {
  // Create the data
  return specRepository.createSpec(data);
};

exports.updateSpec = async (id, data, file) => {
  // find spec is exist or not (validate the data)
  const existingSpec = specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingSpec, // existing spec
    ...data,
  };

  // if exist, we will update the spec data
  const updatedSpec = specRepository.updateSpec(id, data);
  if (!updatedSpec) {
    throw new InternalServerError(["Failed to update spec!"]);
  }

  return updatedSpec;
};

exports.deleteSpecById = async (id) => {
  // Find spec by id (async)
  const existingSpec = await specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  // If the spec exists, delete the spec (async)
  const deletedSpec = await specRepository.deleteSpecById(id);
  if (!deletedSpec) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  // Return the deleted model data
  return existingSpec;
};
