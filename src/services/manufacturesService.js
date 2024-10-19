const manufactureRepository = require("../repositories/manufacturesRepository");
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getManufactures = (
  manufacture_name,
  manufacture_region,
  year_establish
) => {
  return manufactureRepository.getManufactures(
    manufacture_name,
    manufacture_region,
    year_establish
  );
};

exports.createManufacture = async (data) => {
  return manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data) => {
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  data = {
    ...existingManufacture,
    ...data,
  };

  const updatedManufacture = await manufactureRepository.updateManufacture(
    id,
    data
  );
  if (!updatedManufacture) {
    throw new InternalServerError(["Failed to update manufacture!"]);
  }

  return updatedManufacture;
};

exports.deleteManufactureById = (id) => {
  const existingManufacture = manufactureRepository.getManufactureById(id);
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  const deletedManufacture = manufactureRepository.deleteManufactureById(id);
  if (!deletedManufacture) {
    throw new InternalServerError(["Failed to delete manufacture!"]);
  }

  return deletedManufacture;
};
