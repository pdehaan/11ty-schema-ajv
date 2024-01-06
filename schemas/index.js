const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });
ajv.addSchema(require("./blogs"));

function validateSchema(data, id, dataVar) {
  const validate = ajv.getSchema(id);
  if (!validate(data)) {
    throw new Error(ajv.errorsText(validate.errors, { dataVar }));
  }
}

module.exports = {
  validate: validateSchema,
};
