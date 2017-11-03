'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connection;



db.on('error', function (err) {
  console.error('mongodb connection error:', err);
  process.exit(1);
});

db.once('open', function () {
  console.info('Connected to mongodb.', db.db.databaseName);
});

mongoose.connect('mongodb://localhost/nodepop', {
  useMongoClient: true
});

module.exports = db;
