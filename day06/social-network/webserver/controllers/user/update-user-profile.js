'use strict';

const Joi = require('joi');
const dot = require('dot-object');

const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    fullName: Joi.string()
      .min(3)
      .max(128)
      .required(),
    preferences: Joi.object().keys({
      isPublicProfile: Joi.bool().required(),
      linkedIn: Joi.string()
        .uri()
        .allow(null),
      twitter: Joi.string()
        .uri()
        .allow(null),
      github: Joi.string()
        .uri()
        .allow(null),
      description: Joi.string().allow(null),
    }),
  };

  return Joi.validate(payload, schema);
}

async function updateUserProfile(req, res) {
  const userProfileData = { ...req.body };
  const { claims } = req;
  try {
    await validate(userProfileData);
  } catch (e) {
    return res.status(400).send(e.message);
  }
  try {
    const userProfileDataMongoose = dot.dot(userProfileData);
    await UserModel.updateOne({ uuid: claims.uuid }, userProfileDataMongoose);
    return res.status(204).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = updateUserProfile;
