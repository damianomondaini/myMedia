// Require packages
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let passportGoogle = require('passport-google-oauth');
let morgan = require('morgan');
let httpsLocalhost = require('https-localhost');

require('dotenv').config();

// Create app
let app = httpsLocalhost();

// Connection MongoDB
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
    throw err
});

// View engine
app.set('view engine', 'ejs');

// App use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// Routes
let test = require('./routes/test.route');
app.use('/test', test);

// Listen
app.listen(process.env.PORT);