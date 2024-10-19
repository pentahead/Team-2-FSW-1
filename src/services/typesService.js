const typeRepository = require("../repositories/typesRepository");
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes = (type_name) => {
  return typeRepository.getTypes(type_name);
};

exports.createType = async (data) => {
  return typeRepository.createType(data);
};

exports.updateType = async (id, data) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  data = {
    ...existingType,
    ...data,
  };

  const updatedType = await typeRepository.updateType(id, data);
  if (!updatedType) {
    throw new InternalServerError(["Failed to update type!"]);
  }

  return updatedType;
};

exports.deleteTypeById = async (id) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  const deletedType = await typeRepository.deleteTypeById(id);
  if (!deletedType) {
    throw new InternalServerError(["Failed to delete type!"]);
  }

  return deletedType;
};
