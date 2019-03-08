'use strict';

const Joi = require('joi');

const userModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    q: Joi.string()
      .min(3)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function search(req, res) {
  const searchData = req.query;
  try {
    await validate(searchData);
  } catch (e) {
    return res.status(400).send(e.message);
  }
  try {
    const userData = await userModel
      .find({ $text: { $search: searchData.q } }, { _id: 0, score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean();
    return res.json(userData);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = search;
