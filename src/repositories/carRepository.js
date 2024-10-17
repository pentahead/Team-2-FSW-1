const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

// exports.get = async () => {};
// exports.getByID = async () => {};
exports.createCar = async (data) => {
  const newCar = await prisma.cars.create({
    include: {
      Models: {
        include: {
          Transmission: true,
          Manufacture: true,
          Type: true,
        },
      },
      Available: true,
    },
    data,
  });
  const serealizedCars = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serealizedCars);
};
// exports.updateById = async () => {};
// exports.deleteById = async () => {};
