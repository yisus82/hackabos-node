'use strict';

const express = require('express');
const multer = require('multer');

const getUserProfile = require('../controllers/user/get-user-profile');
const updateUserProfile = require('../controllers/user/update-user-profile');
const checkJWTToken = require('../controllers/session/check-jwt-token');
const uploadAvatar = require('../controllers/user/upload-avatar');
const post = require('../controllers/user/post.js');

const upload = multer();
const userRouter = express.Router();

userRouter.get('/user', checkJWTToken, getUserProfile);
userRouter.put('/user', checkJWTToken, updateUserProfile);
userRouter.post('/user/avatar', checkJWTToken, upload.single('avatar'), uploadAvatar);
userRouter.post('/user/post', checkJWTToken, post);

module.exports = userRouter;
