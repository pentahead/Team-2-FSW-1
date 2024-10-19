const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getManufactures = async (
  manufacture_name,
  manufacture_region,
  year_establish
) => {
  let query = {};

  let orQuery = [];

  if (manufacture_name) {
    orQuery.push({
      manufacture_name: { contains: manufacture_name, mode: "insensitive" },
    });
  }
  if (manufacture_region) {
    orQuery.push({
      manufacture_region: { contains: manufacture_region, mode: "insensitive" },
    });
  }
  if (year_establish) {
    orQuery.push({
      year_establish: { equals: year_establish },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedManufactures = await prisma.manufacture.findMany(query);

  const serializedManufactures = JSONBigInt.stringify(searchedManufactures);
  return JSONBigInt.parse(serializedManufactures);
};

exports.createManufacture = async (data) => {
  try {
    const newManufacture = await prisma.manufacture.create({
      data,
    });

    const serializedManufactures = JSONBigInt.stringify(newManufacture);
    return JSONBigInt.parse(serializedManufactures);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating manufacture");
  }
};

exports.getManufactureById = async (id) => {
  try {
    const manufacture = await prisma.manufacture.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {},
    });

    if (!manufacture) {
      throw new Error(`Manufacture with id ${id} not found`);
    }

    const serializedManufacture = JSONBigInt.stringify(manufacture);
    return JSONBigInt.parse(serializedManufacture);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving manufacture data");
  }
};

exports.getManufactureById = async (id) => {
  try {
    const manufacture = await prisma.manufacture.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {},
    });

    if (!manufacture) {
      throw new Error(`Manufacture with id ${id} not found`);
    }

    const serializedManufacture = JSONBigInt.stringify(manufacture);
    return JSONBigInt.parse(serializedManufacture);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving manufacture data");
  }
};

exports.updateManufacture = async (id, data) => {
  try {
    const updatedManufacture = await prisma.manufacture.update({
      where: { id: parseInt(id, 10) },

      data: {
        ...data,
      },
    });

    const serializedManufactures = JSONBigInt.stringify(updatedManufacture);
    return JSONBigInt.parse(serializedManufactures);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating manufacture data");
  }
};

exports.deleteManufactureById = async (id) => {
  try {
    const deletedManufacture = await prisma.manufacture.delete({
      where: { id: parseInt(id, 10) },
    });

    const serializedManufacture = JSONBigInt.stringify(deletedManufacture);
    return JSONBigInt.parse(serializedManufacture);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting manufacture data");
  }
};
