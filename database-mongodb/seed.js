const db  = require('./index.js');
const Blog = require('./Blog.js');
const faker = require('faker');

var photos = ['shoes.jpg', 'office.jpg', 'plants.jpg', 'barka.jpg', 'jewel.jpg', 'plants2.jpg', 'scarf.jpg'];

const samplePosts = [];
for (let i = 0; i < 7; i += 1) {
  var newPost = {};
  newPost.title = faker.lorem.words();
  newPost.author = faker.name.findName();
  newPost.imageUrl = `images/${faker.random.arrayElement(photos)}`;
  newPost.createdAt = faker.date.past();
  newPost.body = faker.lorem.paragraphs(faker.random.number({ min: 3, max: 8 }),'\n\n');
  newPost.featured = false;
  newPost.views = faker.random.number({ min: 100, max: 500 });
  samplePosts.push(newPost);
}

const insertSampleBlogs = function() {
  Blog.deleteMany({}).then(() => {
    Blog.create(samplePosts)
    .then(() => db.disconnect());
  });
};

insertSampleBlogs();