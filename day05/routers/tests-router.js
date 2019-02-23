'use strict';

const express = require('express');

const router = express.Router();

router.get('/test01', (req, res) => {
  console.log(`Query params received: ${req.query}`);
  res.send(req.query);
});

router.get('/test02', (req, res) => {
  console.log(`Query params received: ${req.query}`);
  res.send(req.query);
});

module.exports = router;
