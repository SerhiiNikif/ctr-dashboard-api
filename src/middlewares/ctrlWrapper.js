/**
 * Wrapper function around the controller to handle errors.
 * @function
 * @param {Function} ctrl - The controller function to be wrapped.
 * @returns {Function} The wrapped function.
 */
export default function (ctrl) {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
}
