const ErrorTypeEnum = require('./errorTypeEnum');
module.exports = (err, req, res, next) => {
  const error = JSON.parse(err.message);
  switch (error.customType) {
    case ErrorTypeEnum.INVALID_URL:
      return res.status(500).json({
        success: false,
        ...JSON.parse(err.message)
      });
    default:
      // log the error
      return;
  }
};
