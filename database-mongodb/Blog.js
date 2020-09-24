const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  imageUrl: String,
  body: String,
  featured: Boolean,
  views: {type: Number, default: 0}
}, 
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
