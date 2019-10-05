const parseError = require('parse-error');

const to = promise =>
  promise.then(data => [null, data]).catch(err => [parseError(err)]);

const throwError = err => {
  throw new Error(err);
};

module.exports = {
  to,
  throwError
};
