const joi = require("joi")
const bookingSchema = joi.object({
    room : joi.string().required().messages({
        "any.required" : "room is required"
    }),
    CustomerName : joi.string().required().min(3).messages({
        "string.min":"Name must atleast have three characters",
        "any.required": "Name is required"
    }) ,
    CustomerPhone: joi.string().required().length(11).pattern(/^[0-9]+$/).messages({
      "any.required":"Phone Number is required",
      "string.length":"Phone Number lenght should be 11 digits",
      "string.pattern.base":"Phone Number should only contain digits"
    }),
    CustomerEmail : joi.string().required().email().messages({
        "string.email": "Enter a valid email",
        "any.required" : "Email is required"
    }),
    CheckInDate: joi.date().required().messages({
    "any.required": "Check-in date is required",
    "date.base": "Check-in date must be a valid date"
  }),
  CheckOutDate: joi.date().required().greater(joi.ref('CheckInDate')).messages({
    "any.required": "Check-out date is required",
    "date.base": "Check-out date must be a valid date",
    "date.greater": "Check-out date must be after Check-in date"
  })
})
module.exports = bookingSchema