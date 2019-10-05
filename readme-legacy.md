In an ideal world, everything works successfully. However in real worlds there always unexpected errors.
For example, a connection to the database drops out for whatever reason.
So as a best practice, developers should count these unexpected situations and handle them properly.
That means we should properly send an error message to the client and also log the unexpected situation.

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
In the last section, we take a clean approach to handle errors properly. 
But there's a problem with this implementation. Let's say tomorrow we decide to change the error message, that is sent to the client. In current implementation, we have go through every route handler, where we use the promise wrapper and modify that message. 
So we want to move the logic for handling errors somewhere central. So in the future, if we want to make it change, how we handle error, there will be a single place to modify.
In express, there's a special kind of middleware `error` middleware. We will register the error-middleware function after all the middleware functions.

`some routes`
`app.use(errorMiddleware)`

In regular try/catch method,
For most cases, when a error is

Generate Error: https://gist.github.com/bmshamsnahid/43ee54e7771a13c777ee39cd69b204bf.js
Callback Solution:
https://gist.github.com/bmshamsnahid/e861d124a5be0db839204dbe07d64e04.js
Promise Skeleton
https://gist.github.com/bmshamsnahid/5688394805b946b2cc5492e022001147.js
Promise Solution
https://gist.github.com/bmshamsnahid/5d1a6d66ef629d62cd33865840dd90c2.js
Async await
https://gist.github.com/bmshamsnahid/bd48fd6e7effb483b492d55aa807fc57.js
Utils
https://gist.github.com/bmshamsnahid/fdcb6d68486b5e1250480edf9bb6be8a.js
Updated Promise https://gist.github.com/bmshamsnahid/b6311aebda67b087d51a326224ea70a0.js
Express Server
https://gist.github.com/bmshamsnahid/71bc477bdcb434549fa5257fb3e5cd68.js
Express Middleware
https://gist.github.com/bmshamsnahid/006275b9aba10b416a71fe36e7e0a776.js
