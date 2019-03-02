'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const mongoURI = process.env.MONGO_URI;

async function connect() {
  const connection = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
  });
  return connection;
}

async function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect,
  disconnect,
};
