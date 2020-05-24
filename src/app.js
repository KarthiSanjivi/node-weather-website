const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express confi
const publicDirectory = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Karthi Sanjivi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Karthi Sanjivi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ',
        content: 'This content is coming from app.js',
        name: 'Karthi Sanjivi'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide a address' });
    }
    geocode(
        req.query.address,
        (response) => {
            res.send(response);
        },
        (error) => {
            res.send(error);
        }
    );
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karthi Sanjivi',
        errorMessage: 'Help article not found.'
    });
});

//Everything else- 404 pages

// app.get('*', (req, res) => {
//     res.send('My 404 pages');
// });

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karthi Sanjivi',
        errorMessage: 'Page not found.'
    });
});
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});