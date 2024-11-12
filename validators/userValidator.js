const joi = require('joi')

const registerUserSchema=joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
})

module.exports={registerUserSchema}