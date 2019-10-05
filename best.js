const request = require('request-promise-native');
const { throwError, to } = require('./util');
const ErrorTypeEnum = require('./errorTypeEnum');

const requestWrapper = async (req, res) => {
  [err, response] = await to(request.get(req.params.url));
  err.customType = ErrorTypeEnum.INVALID_URL;
  err && throwError(JSON.stringify(err));
  res.send('Valid url');
};

module.exports = requestWrapper;
