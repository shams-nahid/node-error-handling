# Node.js Error Handling (The Good, The Bad, The Ugly)

![Node.js Error Handling](node_error_handling.png)

In an ideal world, everything works successfully. However in real worlds there always unexpected errors.
For example, a connection to the database drops out for whatever reason.
So as a best practice, developers should count these unexpected situations and handle them properly.
That means we should properly send an error message to the client and also log the unexpected situation.

> # In this article we only cover the exception handling and also, how can we improve the exception-handle functionality.

### Generate Error

Let me demonstrate a real-world scenario, where some exception occurs. Here, we make a get request at URL [https://www.some-unknown-url-1234.com/](https://www.some-unknown-url-1234.com/) and expect to get status `200`.

Since the URL that does not exist, and it will through some unhandled error.

```javascript
const request = require('request');

const requestWrapper = url => {
  request.get(url);
};

requestWrapper('https://www.some-unknown-url-1234.com/');
```

In this situation, the node process will be terminated, could not serve as it should.

> # **So we need to properly handle these scenarios. And this article is all about handled these scenarios.**

We will go through **4 approaches** here

1. Traditional Callback Approach

2. Promises

3. `async/await`

4. Promise Wrapper

5. From Express.js Server (Bonus Approach with Express.js)

### Project Setup

- Create a `project-directory` and open terminal into that.

  `> mkdir error-handling`

  `> cd error-handling`

- Create a node project.

  `> npm init -y`

- Install dependencies

  `> npm i express express-async-error parse-error request request-promise-native`

### Callback Approach (The Ugly)

Here URL `https://www.some-unknown-url-1234.com/` does not exist and for that, we are getting an error. To catch the error, We simply pass a `callback` method, and handle it.

```javascript
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
```

In this callback approach, there is always a big irritating issue of `callback-hell`.

### Using Promise (The Bad)

When we are using a promise, we can simply chain the catch() method.

```javascript
SomeTask()
  .then()
  .then()
  .catch(error => throw error);
```

Except the last `catch()` method We get the responses. And in the final chain method, `catch()`, we can grab the error if there is any. Using promise, our updated codebase will be,

```javascript
const request = require('request-promise-native');

const requestWrapper = url => {
  request
    .get(url)
    .then(response => response)
    .catch(err => console.log(err));
};

requestWrapper('https://www.some-unknown-url-1234.com/');
```

### async/await (The Bad)

A `promise-chain` is also another big headache. We will remove the promise and use a clean `async/await` format.

```javascript
const request = require('request-promise-native');

const requestWrapper = async url => {
  try {
    await request.get(url);
  } catch (error) {
    console.log(error);
  }
};

requestWrapper('https://www.some-unknown-url-1234.com/');
```

This is far better than previous `promise-chain`. But the problem is, each time we try to catch an error, we have to repeat the `try/catch` block.

### Promise Wrapper(The Good)

To update previous `async/await` approach, we can write a simple `promise-wrapper` to remove the repetitive `try/catch` block.

Let’s create some utility method in `utils.js`

```javascript
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
```

In `utils.js` we got two methods, `to()` method returns a promise . Since it’s a `promise-chain`, if there’s an error occurs, it will parse and send the error.

Method `throwError()` will simply throw the error. In the next section, we will use a `express-middleware`. Then it will come handy.

Now our updated approach will be

```javascript
const request = require('request-promise-native');
const { throwError, to } = require('./util');

const requestWrapper = async url => {
  [err, response] = await to(request.get(url));
  err && throwError('invalid error');
};

requestWrapper('https://www.some-unknown-url-1234.com/');
```

### Error Handling Middleware (For Express.js)

In the last section, we take a clean approach to handle errors properly.

But there’s a problem with this implementation. Let’s say tomorrow we decide to change the error message, that is sent to the client. In the current implementation, we have to go through every route handler, where we use the promise wrapper and modify that message.

> # So we want to move the logic for handling errors somewhere central.

Then in the future, if we want to make it change, how we handle error, there will be a single place to modify.

In express, there’s a special kind of middleware `error` middleware. We will register the `error-middleware` function after all the middleware functions.

For express let’s create the server,

```javascript
const app = require('express')();
require('express-async-errors');
const errorMiddleware = require('./error');

const requestWrapper = require('./requestWrapper');

app.get('/:url', requestWrapper);
app.use(errorMiddleware);

app.listen(8080);
```

Make sure you are using the express `error-middleware` as the final middleware.

There’s left the last piece of the puzzle, The `error-middleware`

```javascript
const ErrorTypeEnum = require('./errorTypeEnum');
module.exports = (err, req, res, next) =>
  return res.status(500).json({
    success: false,
    ...JSON.parse(err.message)
  });
```

The `error-middleware` simply grabs the thrown error and send it back to the client.

Some advantage of `error-middleware` over regular `error-response` is,

- Cental placement for error response.

- Whenever we throw an error, this middleware is always there to grab the error.

### Wrap Up
Congrats!!!, I hope you got some clean implementation way for error handling. For any query, please leave a response below. I will reply as soon possible. Also, you can contact [iXora team](https://ixorasolution.com/contact) for any assistance at <info@ixorasolution.com>
