'use strict';

const cloudinary = require('cloudinary');
const userModel = require('../../../models/user-model');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

async function uploadAvatar(req, res, next) {
  const { uuid } = req.claims;
  const { file } = req;

  if (!file.buffer) {
    return res.status(400).send();
  }

  cloudinary.v2.uploader
    .upload_stream(
      {
        resource_type: 'raw',
        public_id: uuid,
        width: 200,
        height: 200,
        format: 'jpg',
        crop: 'limit'
      },
      async (err, result) => {
        if (err) {
          console.error('hubo error', err);
          return res.status(400).send(err);
        }

        const { etag, secure_url: secureUrl } = result;

        const updateUserProfile = {
          avatarUrl: secureUrl
        };

        try {
          await userModel.updateOne({ uuid }, updateUserProfile);
          res.header('Location', secureUrl);
          return res.status(204).send();
        } catch (e) {
          console.log(e);
          return res.status(500).send(err.mesage);
        }
      }
    )
    .end(file.buffer);
}

module.exports = uploadAvatar;
