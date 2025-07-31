const express = require('express');
const router = express.Router();
const Garbage = require('./garbage');
const Voice = require('./voice');

const prefix = '/api';

function routers(app) {
  app.use(`${prefix}`, Garbage);
  app.use(`${prefix}`, Voice);
}

module.exports = routers;
