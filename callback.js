const request = require('request');

const requestWrapper = (url, cb) => {
  request.get(url, (err, response) => cb(err, response));
};

const myCallBackMethod = (err, response) => {
  if (err) {
    throw new Error(err);
  }
};

requestWrapper('https://www.some-unknown-url-1234.com/', myCallBackMethod);
