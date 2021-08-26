const joi = require('joi')

const updateContactVaildate = joi.object({
  name: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
  phone: joi.string(),
}).min(1)

module.exports = updateContactVaildate
