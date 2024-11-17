const Joi = require("joi");

module.exports.playerJoiSchema = Joi.object({
  player: Joi.object({
    name: Joi.string().required(),
    spouse: Joi.string().allow("", null),
    role: Joi.string().required(),
    jersey: Joi.number().required().min(0),
    born: Joi.string().required(),
    image: Joi.string().allow("", null),
    country: Joi.string().required()
  }).required()
})