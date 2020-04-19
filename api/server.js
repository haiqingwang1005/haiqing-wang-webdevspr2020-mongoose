const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const shortenRoutes = require('./routes/shortenRoutes');
const tinyRoutes = require('./routes/tinyRoutes');
const HttpError = require('./model/httpError');

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());

app.use('/api/shorten', shortenRoutes);
app.use('/tiny', tinyRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route', 404);
});

app.use((error, req, res, next) => {
    console.log('error');
    console.log(error);
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error!'});
});

// Refer https://blog.bitsrc.io/react-production-deployment-part-3-heroku-316319744885
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}

mongoose
    .connect('mongodb+srv://haiqingwang1005:libra241705@cluster0-hrstn.mongodb.net/shorten?retryWrites=true&w=majority')
    .then(() => {
        app.listen(app.get('port'), function() {
            console.log('Starting server');
        });
    })
    .catch(err => {
        console.log(err);
    });
