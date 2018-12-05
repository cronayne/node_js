const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

//MongoDB Atlas
//mongoose.connect('mongodb+srv://cronayne:GtQFeTwEPgFwGUDA@nodejs-f1sha.mongodb.net/node_js?retryWrites=true', { useNewUrlParser: true })
//Localhost
mongoose.connect('mongodb://localhost:27017/node_js')
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch(err => console.log('Mongo connection error', err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
               );
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, PATCH, DELETE, OPTIONS'
               );
  next();
});

app.post('/api/posts', (req, res, next) =>  {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = app;
