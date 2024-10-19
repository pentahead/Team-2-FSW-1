const availableRepository = require("../repositories/availablesRepository"); // Ganti path sesuai dengan struktur proyek
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getAvailable = (available_status) => {
  return availableRepository.getAvailable(available_status);
};

exports.createAvailable = async (data) => {
  return availableRepository.createAvailable(data);
};

exports.updateAvailable = async (id, data) => {
  const existingAvailable = await availableRepository.getAvailableById(id);
  if (!existingAvailable) {
    throw new NotFoundError("Available status is Not Found!");
  }

  data = {
    ...existingAvailable,
    ...data,
  };

  const updatedAvailable = await availableRepository.updateAvailable(id, data);
  if (!updatedAvailable) {
    throw new InternalServerError(["Failed to update available status!"]);
  }

  return updatedAvailable;
};

exports.deleteAvailableById = async (id) => {
  const existingAvailable = await availableRepository.getAvailableById(id);
  if (!existingAvailable) {
    throw new NotFoundError("Available status is Not Found!");
  }

  const deletedAvailable = await availableRepository.deleteAvailableById(id);
  if (!deletedAvailable) {
    throw new InternalServerError(["Failed to delete available status!"]);
  }

  return deletedAvailable;
};
