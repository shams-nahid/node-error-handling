const request = require('request-promise-native');
const { throwError, to } = require('./util');

const requestWrapper = async url => {
  [err, response] = await to(request.get(url));
  err && throwError('invalid error');
};

const inCorrectUrl = 'https://www.some-unknown-url-1234.com/';
const correctUrl = 'https://www.google.com/';

requestWrapper(inCorrectUrl);
