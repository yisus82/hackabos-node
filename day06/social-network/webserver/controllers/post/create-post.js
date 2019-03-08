'use strict';

const Joi = require('joi');
const PostModel = require('../../../models/post-model');

async function validate(payload) {
  const schema = {
    content: Joi.string()
      .min(5)
      .max(1024)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function createPost(req, res) {
  const { claims } = req;
  const { uuid } = claims;

  /**
   * 1.1 Validate data
   */
  const postData = { ...req.body };

  try {
    await validate(postData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const data = {
    owner: uuid,
    author: uuid,
    content: postData.content,
    likes: [],
    comments: [],
    deletedAt: null,
  };

  try {
    const postCreated = await PostModel.create(data);
    return res.status(201).send(postCreated);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = createPost;
