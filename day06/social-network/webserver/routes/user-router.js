'use strict';

const express = require('express');
const getUserProfile = require('../controllers/user/get-user-profile');
const updateUserProfile = require('../controllers/user/update-user-profile');
const checkJWTToken = require('../controllers/session/check-jwt-token');

const userRouter = express.Router();

userRouter.get('/user', checkJWTToken, getUserProfile);
userRouter.put('/user', checkJWTToken, updateUserProfile);

module.exports = userRouter;
