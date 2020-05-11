import responseCodes from '../../helpers/constants/httpResponseCodes';
import ErrorResponse from '../../helpers/errorResponse';

/**
 * Validator Class
 */
export default class Validator {
  /**
   * @description Validate user input
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validationInput(schema) {
    return async (req, res, next) => {
      const result = await Validator.validateSchema(req.body, schema);

      if (result.hasError) {
        const errors = result.errors;
        return ErrorResponse.httpErrorResponse(res, errors, 400);
      }

      req.body = result.fields;
      return next();
    };
  }

  /**
   * @description Check schema against user input
   *
   * @param {object} data User input from the request body
   * @param {object} schema Joi schema for the input
   * @returns {object} result of validation
   */
  static async validateSchema(data, schema) {
    try {
      const value = await schema.validateAsync(data, {
        abortEarly: false,
      });
      return { hasError: false, fields: value };
    } catch ({ details }) {
      return Validator.formatErrorDetails(details, true);
    }
  }

  /**
   * @description Customize the format of the errors from the validation
   *
   * @param {Array} details Details of joi error object
   * @param {boolean} flag indicates if the validation fails
   * @returns {object} Customized errors
   */
  static formatErrorDetails(details, flag) {
    const errors = details.map((detail) => ({
      code: responseCodes.BAD_REQUEST.code,
      type: responseCodes.BAD_REQUEST.type,
      message: `${detail.message.replace(/"/g, '')}`,
      field: `${detail.path[0]}`,
    }));

    return { hasError: flag, errors };
  }
}
