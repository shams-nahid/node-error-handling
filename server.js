const express = require('express');
const app = express();
require('express-async-errors');
const errorMiddleware = require('./error');

const requestWrapper = require('./best');

app.get('/:url', requestWrapper);
app.use(errorMiddleware);

app.listen(8080);
