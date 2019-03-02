'use strict';

const UserModel = require('../../../models/user-model');

async function getUserProfile(req, res) {
  const { uuid } = req.claims;
  try {
    const userProfileData = await UserModel.findOne(
      { uuid },
      { _id: 0 },
      { lean: true }
    );
    return res.json(userProfileData);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = getUserProfile;
