const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getModels = async (model, capacity) => {
  // Define query here
  let query = {
    include: {
      Transmission: true,
      Type: true,
      Manufacture: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (model) {
    orQuery.push({
      model_name: { contains: model, mode: "insensitive" },
    });
  }
  if (capacity) {
    orQuery.push({
      capacity: { contains: capacity, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedModels = await prisma.Models.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(searchedModels);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  // Convert the string ID to an integer
  const modelId = parseInt(id, 10);

  // Find model by ID
  const model = await prisma.Models.findFirst({
    where: {
      id: modelId,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModels);
};

exports.createModel = async (data) => {
  const newModel = await prisma.Models.create({
    data: {
      model_name: data.model_name,
      transmission_id: parseInt(data.transmission_id, 10),
      capacity: parseInt(data.capacity, 10),
      type_id: parseInt(data.type_id, 10),
      manufacture_id: parseInt(data.manufacture_id, 10),
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};

exports.updateModel = async (id, data) => {
  // Find the existing model data
  const updatedModel = await prisma.models.update({
    where: {
      id: Number(id),
    },
    data: {
      model_name: data.model_name,
      transmission_id: parseInt(data.transmission_id, 10),
      capacity: parseInt(data.capacity, 10),
      type_id: parseInt(data.type_id, 10),
      manufacture_id: parseInt(data.manufacture_id, 10),
    },
  });

  const serializedModels = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelById = async (id) => {
  const deletedModel = await prisma.models.delete({
    where: { id: Number(id) },
  });
  return deletedModel;
};
