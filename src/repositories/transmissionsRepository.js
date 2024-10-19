const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTransmissions = async (transmission_name) => {
  let query = {};
  let orQuery = [];

  if (transmission_name) {
    orQuery.push({
      transmission_name: { contains: transmission_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedTransmissions = await prisma.transmission.findMany(query);
  const serializedTransmissions = JSONBigInt.stringify(searchedTransmissions);
  return JSONBigInt.parse(serializedTransmissions);
};

exports.createTransmission = async (data) => {
  try {
    const newTransmission = await prisma.transmission.create({
      data,
    });

    const serializedTransmission = JSONBigInt.stringify(newTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating transmission");
  }
};

exports.getTransmissionById = async (id) => {
  try {
    const transmission = await prisma.transmission.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {},
    });

    if (!transmission) {
      throw new Error(`Transmission with id ${id} not found`);
    }

    const serializedTransmission = JSONBigInt.stringify(transmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving transmission data");
  }
};

exports.updateTransmission = async (id, data) => {
  try {
    const updatedTransmission = await prisma.transmission.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        ...data,
      },
    });

    const serializedTransmission = JSONBigInt.stringify(updatedTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating transmission data");
  }
};

exports.deleteTransmissionById = async (id) => {
  try {
    const deletedTransmission = await prisma.transmission.delete({
      where: { id: parseInt(id, 10) },
    });

    const serializedTransmission = JSONBigInt.stringify(deletedTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting transmission data");
  }
};
