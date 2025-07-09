const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routers = require('./routes/index')
const responseMiddleware = require('./middleware/response.js');
require('./utils/db.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 返回中间件处理
app.use(responseMiddleware);
// 路由
routers(app);

module.exports = app;
