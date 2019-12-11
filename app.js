// Require packages
let express = require('express');
let expressSession = require('express-session');
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
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/src', express.static('src'))

let mainRoute = require('./routes/main.route');
let adminRoute = require('./routes/admin.route');
let authRoute = require('./routes/auth.route');

app.use('/', mainRoute);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);

// Listen
app.listen(process.env.PORT);