const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getModels = async (
  model,
  capacity,
  transmission_name,
  type_name,
  manufacture_name,
  spec_name,
  option_name
) => {
  // Define query here
  let query = {
    include: {
      transmission: true,
      type: true,
      manufacture: true,
      Specs: true,
      Options: true,
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
      capacity: parseInt(capacity, 10), // Compare capacity as a number
    });
  }
  if (transmission_name) {
    orQuery.push({
      transmission: {
        transmission_name: { contains: transmission_name, mode: "insensitive" },
      },
    });
  }
  if (type_name) {
    orQuery.push({
      type: {
        type_name: { contains: type_name, mode: "insensitive" },
      },
    });
  }
  if (manufacture_name) {
    orQuery.push({
      manufacture: {
        manufacture_name: { contains: manufacture_name, mode: "insensitive" },
      },
    });
  }
  if (spec_name) {
    orQuery.push({
      Specs: {
        spec_name: { contains: spec_name, mode: "insensitive" },
      },
    });
  }
  if (option_name) {
    orQuery.push({
      Options: {
        option_name: { contains: option_name, mode: "insensitive" },
      },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedModels = await prisma.models.findMany(query);

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
    include: {
      transmission: true,
      type: true,
      manufacture: true,
      Specs: true,
      Options: true,
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
      options_id: parseInt(data.type_id, 10),
      specs_id: parseInt(data.manufacture_id, 10),
    },
    include: {
      transmission: true,
      type: true,
      manufacture: true,
      Specs: true,
      Options: true,
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
      options_id: parseInt(data.type_id, 10),
      specs_id: parseInt(data.manufacture_id, 10),
    },
    include: {
      transmission: true,
      type: true,
      manufacture: true,
      Specs: true,
      Options: true,
    },
  });

  const serializedModels = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelById = async (id) => {
  const deletedModel = await prisma.models.delete({
    where: { id: Number(id) },
    include: {
      transmission: true,
      type: true,
      manufacture: true,
      Specs: true,
      Options: true,
    },
  });
  return deletedModel;
};
