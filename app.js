const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//connect to mongodb & listen for requests
const dbURI = "mongodb+srv://shabayek:shabayek123@expresstut.gp346.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(result => app.listen(PORT))
        .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// if you want change views directory
//app.set('views', 'myViews');

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', requireAuth, blogRoutes);

// Auth routes
app.use(authRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
