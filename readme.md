
# Node.js Error Handling (The Good, The Bad, The Ugly)

In an ideal world, everything works successfully. However in real worlds there always unexpected errors.
For example, a connection to the database drops out for whatever reason.
So as a best practice, developers should count these unexpected situations and handle them properly.
That means we should properly send an error message to the client and also log the unexpected situation.
> # In this article we only cover the exception handling and also, how can we improve the exception-handle functionality.

### Generate Error

Let me demonstrate a real-world scenario, where some exception occurs. Here, we make a get request at URL [https://www.some-unknown-url-1234.com/](https://www.some-unknown-url-1234.com/) and expect to get status 200.

Since the URL that does not exist, and it will through some unhandled error.

<iframe src="https://medium.com/media/85104739a5109c29a9dad647fd69fb49" frameborder=0></iframe>

In this situation, the node process will be terminated, could not serve as it should.
> # **So we need to properly handle these scenarios. And this article is all about handled these scenarios.**

We will go through **4 approaches** here

1. Traditional Callback Approach

1. Promises

1. Async/Await

1. Promise Wrapper

1. From Express.js Server

### Project Setup

* Create a project directory and open terminal into that.

    mkdir error-handling
    cd error-handling

* Create a node project.

    npm init -y

* Install dependencies

    npm i express express-async-error parse-error request request-promise-native

### Callback Approach (The Ugly)

Here URL https://www.some-unknown-url-1234.com/does not exist and for that, we are getting an error. Also, that error is received and We simply put a callback method handle the error.

<iframe src="https://medium.com/media/3e7ec1be66c1a7c434729a416f147601" frameborder=0></iframe>

In this callback approach, there is always a big issue of callback hell.

### Using Promise (The Good)

When we are using a promise, we can simply chain the catch() method.

<iframe src="https://medium.com/media/3309f4c1b1b455c95289b4a610684bf1" frameborder=0></iframe>

We can get the response in first chain and in the final chain method, we can grab the error if there is any. Using promise, our updated codebase will be,

<iframe src="https://medium.com/media/dba8996e75c430eb089f48b04031f5a4" frameborder=0></iframe>

### Async/Await (The Good)

A promise chain is also another big headache. We will remove the promise and use a clean async/await format.

<iframe src="https://medium.com/media/f980de7ba0ada0ceba9d1a3e722a928a" frameborder=0></iframe>

This is far better than previous promise chain. But the problem is, each time we try to catch an error, we have to repeat the try/catch block.

### Promise Wrapper(The best)

To update previous async/await approach, we can write a simple promise-wrapperto remove the repetitive try/catch block.

Let’s create some utility method in utils.js

<iframe src="https://medium.com/media/4bd2704ca9b81862a08cdfb634b93442" frameborder=0></iframe>

In utils.js we got two methods, to returns a promise . Since it’s a promise chain, if there’s an error occurs, it will parse and send the error.

Method throwError will simply throw the error. In the next section, we will use a express-middleware . Then it will come handy.

Now our updated approach will be

<iframe src="https://medium.com/media/f04284b8e845e6d06efb56c4eda7495f" frameborder=0></iframe>

### Error Handling Middleware (For Express.js)

In the last section, we take a clean approach to handle errors properly.

But there’s a problem with this implementation. Let’s say tomorrow we decide to change the error message, that is sent to the client. In the current implementation, we have to go through every route handler, where we use the promise wrapper and modify that message.
> # So we want to move the logic for handling errors somewhere central.

Then in the future, if we want to make it change, how we handle error, there will be a single place to modify.

In express, there’s a special kind of middleware `error` middleware. We will register the error-middleware function after all the middleware functions.

For express let’s create the server,

<iframe src="https://medium.com/media/5d01d78c9280545a2bde9a483cf0d8dc" frameborder=0></iframe>

Make sure you are using the express error-middleware as the final middleare.

There’s left the last piece of the puzzle, The error middleware

<iframe src="https://medium.com/media/d6697d2911f14c4e30c6859dd2cb0ca2" frameborder=0></iframe>

The error middleware simply grabs the thrown error and send it back to the client.

Some advantage of error-middlware over regular error-response is,

* Cental placement for error response.

* Whenever we throw an error, this middleware is always there to grab the error.

I hope you got some clean implementation way for error handling. For any query, please comment below, I’ll replay asap.
