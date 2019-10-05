const request = require('request-promise-native');

const requestWrapper = async url => {
  try {
    await request.get(url);
  } catch (error) {
    console.log(error);
  }
};

const inCorrectUrl = 'https://www.some-unknown-url-1234.com/';
const correctUrl = 'https://www.google.com/';

requestWrapper(inCorrectUrl);
