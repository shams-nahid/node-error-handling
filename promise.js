const request = require('request-promise-native');

const requestWrapper = url => {
  request
    .get(url)
    .then(response => response)
    .catch(err => console.log(err));
};

const inCorrectUrl = 'https://www.some-unknown-url-1234.com/';
const correctUrl = 'https://www.google.com/';

requestWrapper(inCorrectUrl);
