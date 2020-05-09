
/**
 * Validator Class
 */
export default class Validator {
  constructor(schema) {
    this.schema = schema; // joi schema for the input
  }

  /**
   * @description The validation middleware
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async validationInput(req, res, next) {
    const result = await this.validateSchema(req.body, this.schema);

    if (result.hasError) {
      return res.status(400).json({ errors: result.errors });
    }

    req.body = result.fields;
    return next();
  }

  /**
   * @description Check schema against user input
   *
   * @param {object} data User input from the request body
   * @param {object} schema Joi schema for the input
   * @returns {object} result of validation
   */
  async validateSchema(data, schema) {
    try {
      const value = await schema.validateAsync(data, {
        abortEarly: false,
      });
      return { hasError: false, fields: value };
    } catch ({ details }) {
      return this.formatErrorDetails(details, true);
    }
  }

  /**
   * @description Customize the format of the errors from the validation
   *
   * @param {Array} details Details of joi error object
   * @param {boolean} flag indicates if the validation fails
   * @returns {object} Customized errors
   */
  formatErrorDetails(details, flag) {
    const errors = [];

    details.forEach((error) => {
      const data = {
        type: 'InvalidInput',
        code: 'input_err',
        message: `${error.message.replace(/"/g, '')}`,
        field: `${error.path[0]}`,
      };
      errors.push(data);
    });

    return { hasError: flag, errors };
  }
}
