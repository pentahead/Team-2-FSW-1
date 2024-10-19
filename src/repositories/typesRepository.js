const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTypes = async (type_name) => {
  let query = {};

  let orQuery = [];

  if (type_name) {
    orQuery.push({
      type_name: { contains: type_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedTypes = await prisma.type.findMany(query);

  const serializedTypes = JSONBigInt.stringify(searchedTypes);
  return JSONBigInt.parse(serializedTypes);
};

exports.createType = async (data) => {
  try {
    const newType = await prisma.type.create({
      data,
    });

    const serializedType = JSONBigInt.stringify(newType);
    return JSONBigInt.parse(serializedType);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating type");
  }
};

exports.getTypeById = async (id) => {
  try {
    const type = await prisma.type.findUnique({
      where: {
        id: parseInt(id, 10),  
      },
    });

    if (!type) {
      throw new Error(`Type with id ${id} not found`);
    }

    const serializedType = JSONBigInt.stringify(type);
    return JSONBigInt.parse(serializedType);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving type data");
  }
};

exports.updateType = async (id, data) => {
  try {
    const updatedType = await prisma.type.update({
      where: { id: parseInt(id, 10) },  
      data: {
        ...data,  
      },
    });

     
    const serializedType = JSONBigInt.stringify(updatedType);
    return JSONBigInt.parse(serializedType);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating type data");
  }
};

exports.deleteTypeById = async (id) => {
  try {
    const deletedType = await prisma.type.delete({
      where: { id: parseInt(id, 10) }, 
    });

    const serializedType = JSONBigInt.stringify(deletedType);
    return JSONBigInt.parse(serializedType);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting type data"); 
  }
};
