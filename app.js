const express = require('express');

const app = express();

//app listen to 3000 port
app.listen(3000)

// register view engine
app.set('view engine', 'ejs');

// if you want change views directory
//app.set('views', 'myViews');

app.get('/', (req, res) => {
    const blogs = [
        { title: "New first title", body: "First body of blog"},
        { title: "New second title", body: "Second body of blog"},
    ];
    res.render('index', {
        title: "Home",
        blogs
    });
});