'use strict';

const WallModel = require('../../../models/wall-model');
const PostModel = require('../../../models/post-model');

async function getUserWall(req, res) {
  const { uuid } = req.claims;

  try {
    const wallData = await WallModel.findOne({ uuid }, { _id: 0 }, { lean: true });
    const postsData = await PostModel.find({
      _id: { $in: wallData.posts },
      deletedAt: null,
    }).lean();
    return res.json(postsData);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = getUserWall;
