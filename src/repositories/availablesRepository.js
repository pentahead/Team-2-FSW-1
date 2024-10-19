const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getAvailable = async (available_status) => {
  let query = {};

  if (available_status) {
    query.where = {
      available_status: { contains: available_status, mode: "insensitive" },
    };
  }

  const searchedAvailable = await prisma.available.findMany(query);

  const serializedAvailable = JSONBigInt.stringify(searchedAvailable);
  return JSONBigInt.parse(serializedAvailable);
};

exports.createAvailable = async (data) => {
  try {
    const newAvailable = await prisma.available.create({
      data,
    });

    const serializedAvailable = JSONBigInt.stringify(newAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating available status");
  }
};

exports.getAvailableById = async (id) => {
  try {
    const available = await prisma.available.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!available) {
      throw new Error(`Available status with id ${id} not found`);
    }

    const serializedAvailable = JSONBigInt.stringify(available);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving available data");
  }
};

exports.updateAvailable = async (id, data) => {
  try {
    const updatedAvailable = await prisma.available.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...data,
      },
    });

    const serializedAvailable = JSONBigInt.stringify(updatedAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating available data");
  }
};

exports.deleteAvailableById = async (id) => {
  try {
    const deletedAvailable = await prisma.available.delete({
      where: { id: parseInt(id, 10) },
    });

    const serializedAvailable = JSONBigInt.stringify(deletedAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting available data");
  }
};
