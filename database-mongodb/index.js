const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/blogrl';

const db = mongoose.connect(mongoUri);

module.exports = db;
