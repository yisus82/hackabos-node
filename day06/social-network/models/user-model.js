'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  friends: [],
  avatarURL: String,
  fullName: String,
  preferences: {
    isPublicProfile: Boolean,
    linkedIn: String,
    twitter: String,
    github: String,
    description: String,
  },
  __v: { type: Number, select: false },
});

userSchema.index({
  fullName: 'text',
  'preferences.linkedIn': 'text',
  'preferences.github': 'text',
  'preferences.twitter': 'text',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
