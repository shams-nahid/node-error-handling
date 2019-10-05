const app = require('express')();
require('express-async-errors');
const errorMiddleware = require('./error');

const requestWrapper = require('./requestWrapper');

app.get('/:url', requestWrapper);
app.use(errorMiddleware);

app.listen(8080);
