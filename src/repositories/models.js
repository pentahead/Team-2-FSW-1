const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

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

  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};
