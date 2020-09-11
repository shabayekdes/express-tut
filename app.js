const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

const app = express();

//connect to mongodb & listen for requests
const dbURI = "mongodb+srv://shabayek:shabayek123@expresstut.gp346.mongodb.net/expresstut";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(result => app.listen(3000))
        .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(morgan('dev'));

// if you want change views directory
//app.set('views', 'myViews');

app.use((req, res, next) => {
res.locals.path = req.path;
next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/add-blog', (req, res) => {
   const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/single-blog', (req, res) => {
    Blog.findById('5f5bf79965e6f00428fe31ac')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });

 });
    

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});