const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body)

  if (validationBody.error) {
    return res.status(400).json({ message: validationBody.error.message })
  }
  next()
};

module.exports = {
  userValidation: (req, res, next) => {
    return validate(schema, res, req, next)
  }
}