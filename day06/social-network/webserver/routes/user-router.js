'use strict';

const express = require('express');
const multer = require('multer');

const getUserProfile = require('../controllers/user/get-user-profile');
const updateUserProfile = require('../controllers/user/update-user-profile');
const checkJWTToken = require('../controllers/session/check-jwt-token');
const uploadAvatar = require('../controllers/user/upload-avatar');

const upload = multer();
const userRouter = express.Router();

userRouter.get('/user', checkJWTToken, getUserProfile);
userRouter.put('/user', checkJWTToken, updateUserProfile);
userRouter.post('/user/avatar', checkJwtToken, upload.single('avatar'), uploadAvatar);

module.exports = userRouter;
