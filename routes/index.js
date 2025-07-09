const express = require('express');
const router = express.Router();
const Garbage = require('./garbage');

const prefix = '/api';

function routers(app) {
  app.use(`${prefix}`, Garbage);
}

module.exports = routers;
