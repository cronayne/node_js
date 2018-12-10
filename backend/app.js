const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();

//MongoDB Atlas
//mongoose.connect('mongodb+srv://cronayne:GtQFeTwEPgFwGUDA@nodejs-f1sha.mongodb.net/node_js?retryWrites=true', { useNewUrlParser: true })
//Localhost
mongoose.connect('mongodb://localhost:27017/node_js', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch(err => console.log('Mongo connection error', err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
               );
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS'
               );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
