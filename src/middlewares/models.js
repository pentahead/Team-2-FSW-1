const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateModel = (req, res, next) => {
  const validateBody = z.object({
    model_name: z.string(),
    transmission_id: z.string(),
    capacity: z.string(),
    type_id: z.string(),
    manufacture_id: z.string(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
