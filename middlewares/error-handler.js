const { internalServerError } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = internalServerError, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === internalServerError
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
