const request = require('request');

const requestWrapper = url => {
  request.get(url);
};

requestWrapper('https://www.some-unknown-url-1234.com/');
