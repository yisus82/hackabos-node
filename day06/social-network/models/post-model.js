'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  owner: String,
  author: String,
  content: String,
  createdAt: Date,
  comments: [
    {
      author: String,
      comment: String,
      createdAt: String,
    },
  ],
  likes: [String],
  deletedAt: Date,
  __v: { type: Number, select: false },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
