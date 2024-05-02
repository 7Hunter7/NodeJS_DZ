function checkParams(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).send(result.error.details);
    }
    next();
  };
}

function checkBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details);
    }
    next();
  };
}

module.exports = { checkParams, checkBody };
