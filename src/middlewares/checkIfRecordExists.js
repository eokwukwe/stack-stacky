import isEmpty from 'lodash.isempty';

import ErrorResponse from '../helpers/errorResponse';
import responseCodes from '../helpers/constants/httpResponseCodes';

const { NOT_FOUND } = responseCodes;

/**
 * @description - Middleware to check if a record exists in the DB
 *
 * @param {object} model - the model whose record is to be checked
 * @returns {NextFunction}
 */
export default (model) => {
  return async (req, res, next) => {
    try {
      const result = await model.findById(req.params.id);

      if (isEmpty(result)) {
        NOT_FOUND.message = 'Resource with that ID not found';
        return ErrorResponse.httpErrorResponse(res, NOT_FOUND, 404);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
