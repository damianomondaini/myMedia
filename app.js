// Require packages
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

require('dotenv').config();

// Create app
let app = express();

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

// Routes
let test = require('./routes/test.route');
app.use('/test', test);

// Listen
app.listen(process.env.PORT);