function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  };
}

function validateParam(schema, paramName = "params") {
  return (req, res, next) => {
    const { error } = schema.validate(req[paramName]);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  };
}

// Export both
module.exports = { validate, validateParam };