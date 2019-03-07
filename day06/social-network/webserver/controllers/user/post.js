'use strict';

const Joi = require('joi');

const postModel = require('../../../models/post-model');

async function validateSchema(payload) {
  const schema = {
    content: Joi.string()
      .min(1)
      .max(2000)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function getUserProfile(req, res) {
  const { uuid } = req.claims;
  const bodyData = { ...req.body };

  try {
    await validateSchema(bodyData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const now = new Date();
  const createdAt = now
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');

  const postData = {
    owner: uuid,
    author: uuid,
    content: bodyData.content,
    createdAt,
    comments: [],
    likes: [],
    deletedAt: null,
  };

  try {
    const post = await postModel.create(postData);
    return res.json(post);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = getUserProfile;
