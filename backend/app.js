const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fasfdsfdsfs',
      title: 'First serve-side post',
      content: 'Woo look at me, I\'m from the server'
    },
    {
      id: 'lksdfdfjkldsf',
      title: 'Second serve-side post',
      content: 'Woo look at me, I\'m from the server too!!!!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
