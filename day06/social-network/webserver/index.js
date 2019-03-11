'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
let server = null;
app.use(bodyParser.json());

/**
 * Enable CORS with a origin whitelist of valid domains
 * Step 1: Add CORS
 */
app.use((req, res, next) => {
  const accessControlAllowMethods = ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'];

  const accessControlAllowHeaders = [
    'Authorization',
    'Origin',
    'X - Requested - With',
    'Content - Type',
    'Accept',
    'Access - Control - Allow - Request - Method',
    'x - market',
  ];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // Access-Control-Allow-Methods: put accessControlAllowHeaders separated by comma
  res.header('Access-Control-Allow-Methods', accessControlAllowMethods.join(','));
  // put accessControlAllowHeaders separated by comma
  res.header('Access-Control-Allow-Headers', accessControlAllowHeaders.join(','));
  next();
});

/**
 * Add all routes
 */
app.use('/api', routes.accountRouter);
app.use('/api', routes.userRouter);
app.use('/api', routes.postRouter);

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Se siente, tus amigos no están aquí',
  });
});

/**
 * Special route middleware to catch all next(err) generated by controllers
 */
app.use((err, req, res) => {
  console.error('Error 500', err);
  return res.status(500).json({
    message: err.message,
  });
});

/**
 * Start listening requests at a given port
 * @param {Number} port
 */
async function listen(port) {
  if (server === null) {
    server = await app.listen(port);
  } else {
    console.error("Can't listen, server already initialized");
  }
}

/**
 * Stop listening requests
 */
async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error("Can't close a non started server");
  }
}

module.exports = {
  listen,
  close,
};
