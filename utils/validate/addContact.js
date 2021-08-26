const joi = require('joi')

const addContactValidate = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi.string(),
})

module.exports = addContactValidate
