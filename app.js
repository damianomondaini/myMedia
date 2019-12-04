// Require packages
let express = require('express');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let httpsLocalhost = require('https-localhost');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let passport = require('passport');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Session
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));

// Passport JS
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/src', express.static('src'))

let test = require('./routes/test.route');
let userRoute = require('./routes/user.route');
let mainRoute = require('./routes/main.route');
let adminRoute = require('./routes/admin.route');
app.use('/test', test);
app.use('/login', userRoute);
app.use('/admin', adminRoute);
app.use('/', mainRoute);

// Listen
app.listen(process.env.PORT);