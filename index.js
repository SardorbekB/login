const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const registerRoute = require('./router/register');
const loginRoute = require('./router/login');

const db = 'mongodb://localhost/login';
const options = {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(db, options)
    .then(() => {
        console.log('mongodbga ulanish amalga oshdi');
    })
    .catch((err) => {
        console.error('Xato yuz berdi', err);
    });

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname,"public")));

    app.use('/register', registerRoute);
    app.use('/login', loginRoute);

    app.get('/', async(req, res) => {
        res.render('index');
    });

    app.get('/news', async(req, res) => {
        res.render('news');
    });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port} - portni eshtishni boshladim..`);
    console.log(path.join(__dirname, "public"));
});