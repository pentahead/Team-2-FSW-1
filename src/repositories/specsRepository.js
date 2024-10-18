const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getSpecs = async (spec_name) => {
  // Define query here
  let query = {
    where: {},
  };

  // It will generate the query
  let orQuery = [];
  if (spec_name) {
    orQuery.push({
      spec_name: { contains: spec_name, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedSpecs = await prisma.Specs.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedSpecs = JSONBigInt.stringify(searchedSpecs);
  return JSONBigInt.parse(serializedSpecs);
};

exports.getSpecById = async (id) => {
  // Convert the string ID to an integer
  const specId = parseInt(id, 10);

  // Find spec by ID
  const spec = await prisma.Specs.findFirst({
    where: {
      id: specId,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedSpecs = JSONBigInt.stringify(spec);
  return JSONBigInt.parse(serializedSpecs);
};

exports.createSpec = async (data) => {
  const newSpec = await prisma.Specs.create({
    data: {
      spec_name: data.spec_name,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedSpecs = JSONBigInt.stringify(newSpec);
  return JSONBigInt.parse(serializedSpecs);
};

exports.updateSpec = async (id, data) => {
  // Find the existing spec data
  const updatedSpec = await prisma.specs.update({
    where: {
      id: Number(id),
    },
    data: {
      spec_name: data.spec_name,
    },
  });

  const serializedSpecs = JSONBigInt.stringify(updatedSpec);
  return JSONBigInt.parse(serializedSpecs);
};

exports.deleteSpecById = async (id) => {
  const deletedSpec = await prisma.specs.delete({
    where: { id: Number(id) },
  });
  return deletedSpec;
};
