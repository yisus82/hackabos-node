'use strict';

const express = require('express');
const multer = require('multer');

const getUserProfile = require('../controllers/user/get-user-profile');
const updateUserProfile = require('../controllers/user/update-user-profile');
const checkJWTToken = require('../controllers/session/check-jwt-token');
const uploadAvatar = require('../controllers/user/upload-avatar');
const search = require('../controllers/user/search.js');
const addFriendRequest = require('../controllers/user/add-friend-request');
const getFriendRequests = require('../controllers/user/get-friend-requests');
const acceptFriendRequest = require('../controllers/user/accept-friend-request');
const getUserWall = require('../controllers/user/get-user-wall');

const upload = multer();
const userRouter = express.Router();

userRouter.get('/user', checkJWTToken, getUserProfile);
userRouter.put('/user', checkJWTToken, updateUserProfile);
userRouter.post('/user/avatar', checkJWTToken, upload.single('avatar'), uploadAvatar);
userRouter.get('/user/search', checkJWTToken, search);
userRouter.post('/user/friendrequest', checkJWTToken, addFriendRequest);
userRouter.get('/user/friendrequest', checkJWTToken, getFriendRequests);
userRouter.post('/user/friendrequest/accept', checkJWTToken, acceptFriendRequest);
userRouter.get('/user/wall', checkJWTToken, getUserWall);

module.exports = userRouter;
