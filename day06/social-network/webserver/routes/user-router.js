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

const upload = multer();
const userRouter = express.Router();

userRouter.get('/user', checkJWTToken, getUserProfile);
userRouter.put('/user', checkJWTToken, updateUserProfile);
userRouter.post('/user/avatar', checkJWTToken, upload.single('avatar'), uploadAvatar);
userRouter.get('/user/search', checkJWTToken, search);
router.post('/user/friendrequest', checkJwtToken, addFriendRequest);
router.get('/user/friendrequest', checkJwtToken, getFriendRequests);
router.post('/user/friendrequest/accept', checkJwtToken, acceptFriendRequest);

module.exports = userRouter;
