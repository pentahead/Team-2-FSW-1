const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.get = async () => {};
exports.getByID = async () => {};
exports.validateCreateCar = async (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    model_id: z.coerce.number(), 
    rentPerDay: z.coerce.number(), 
    description: z.string(),
    availableAt: z.string(),
    availability_id: z.coerce.number(), 
    year: z.coerce.number(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultvalidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultvalidateFileBody.success) {
    throw new BadRequestError(resultvalidateFileBody.error.errors);
  }
  req.body = resultValidateBody.data;
  next();
};
exports.updateById = async () => {};
exports.deleteById = async () => {};
