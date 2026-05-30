const joi = require("joi")
const idSchema =  joi.object({
    id : joi.string().required().hex().length(24).message({
        "string.length":"Invalid Room ID",
        "any.required":"Room ID is required"
    })
})