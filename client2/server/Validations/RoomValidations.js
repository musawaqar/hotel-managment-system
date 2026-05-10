// Validations/RoomValidations.js
const Joi = require("joi")

const roomSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    "number.base": "Room number must be a number",
    "any.required": "Room number is required"
  }),
  roomType: Joi.string().valid("Single", "Double", "Suite").required().messages({
    "any.only": "Room type must be Single, Double, or Suite",
    "any.required": "Room type is required"
  }),
  roomPrice: Joi.number().min(1).required().messages({
    "number.base": "Room price must be a number",
    "number.min": "Room price cannot be negative"
  }),
  roomIsAvailable: Joi.boolean().optional()
})

module.exports = roomSchema