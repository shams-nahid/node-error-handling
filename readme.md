In ideal world everything works successfully.
However in real worlds there always unexpected errors.
For example, connection to the database drops out for whatever reason.
So as a best practice, developers should count these unexpected situation and
handle them properly.

That means we should properly send error message to the client and also log the
unexpected situation.

In this article we only cover the exception handling and also, how can we improve the exception-handle functionality.

Let me demonstrate a real world scenario, where some exception occours.

Here,We make a get request, `https://www.google.com`
and expect to get status`200`.

But let's assume someone make the request in an invalid url
and the url does not exist.

In this situation, node process will be terminated, could not serve as it should.

So we need to properly handle these scenario.
And this article is all about handle these scenario.

Now take the first step to handle these error properly step by step,

Project Setup: 1. create a project directory and open terminal into that
`mkdir error-handling`
`cd error-handling` 2. Create a node project.
`npm init -y` 3. Install dependencies
`npm i express express-async-error parse-error request request-promise-native`

TRADITIONAL CALLBACK:
Generate error:
Here url `something` does not exist and for that we are getting error
We can simply put a callback method handle the error.
  
  
PROMISE:
When we are using a promise, we can simpley chain the `catch` method.
SomeTask()
.then()
.then()
.catch(error => throw error);
Using promise, our updated codebase is,
  
 This is much better then previous callback hell.

ASYNC/AWAIT:
Now we can simplify the promise chain simply using async/await.
`code`
But the problem is we have to make the try/catch block every time we
try to catch some error.
We can use a try/catch wrapper and throw the error after parsing it.
  
 Here's the `util.js`, we have two methods `to` and `throwError`.
`to` will simply return a promise and make sure if the error is exist or not.
And right now `throwError` method will simply throw the error.

    This is far better then previous `CALLBACK` and `PROMISE`

ERROR HANDLER MIDDLEWARE:
In the last section, we take a clean step to handle errors properly.
But there's a problem in this implementation. Let's say tomorrow we decide
to change the error message, that is sent to the client. In this current
implementation, we have to go through every route handler, where we use
this try/catch block and modify that message.
Also in real world situation, if we change to log the exception, we have
to go through several route handler as well and make the change.
  
 So we want to move the logic for handling errors somewhere central. So if
in the future we want to make it change, how we handle error, there is a
single place to modify.
  
 In express, there's a special kind of middleware `error` middleware.
We register the middleware function after all the middleware functions.
  
 `some routes`
`app.use(errorMiddleware)`
  
  
 In regular try/catch method,
For most cases, when a error is
