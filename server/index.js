const express = require('express');
const bodyParser = require('body-parser');

const Blogs = require('../database-mongodb/Blog.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/blogs', function (req, res) {
  var query = Blogs.find().sort({ createdAt: -1 });
  query.exec((err, blogposts) => {
    if (err) {
      console.log(err);
    } else {
      res.json(blogposts);
    }
  })
});

app.patch('/api/blogs/:blogId', function (req, res) {
  var id = req.params.blogId;
  Blogs.where({ _id: id }).update({ $inc: { views: 1 } }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  })
});

app.post('/api/blogs/:blogId', function (req, res) {
  Blogs.where({ _id: req.params.blogId }).update({ featured: req.body.featured }, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(200);
    }
  })
});

app.post('/api/blogs', function (req, res) {
  var newPost = new Blogs({
    title: req.body.postTitle,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    featured: false,
    body: req.body.postBody
  })

  newPost.save((err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.send('data saved');
    }
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
