export default class ApiError extends Error {
  status;
  errors;

  /**
   * Constructor creating an instance of an API error.
   * @constructor
   * @param {number} status - The HTTP status code of the error.
   * @param {string} message - The error message.
   * @param {Array} errors - An array of additional error details.
   */
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static NotFoundError(message = "Not found") {
    return new ApiError(404, message);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
