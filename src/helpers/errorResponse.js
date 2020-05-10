export default class ErrorResponse extends Error {
  constructor(message, code = 500){
    super(message);
    this.message = message;
    this.code = code;
  }


  /**
   * @description This method returns error respone object
   *
   * @param {object} res HTTP respone object
   * @param {object} error The error object (type, code, message, ?field )
   * @param {number} statusCode
   * @return {object} server reponse
   */
  static httpErrorResponse(res, error, statusCode) {
    return res.status(statusCode || 500).json(error);
  }
}
