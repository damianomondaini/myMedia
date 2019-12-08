let express = require('express');
let passport = require('passport');
let router = express.Router();
let user_controller = require('../controllers/user.controller');

router.get('/button', (req, res) => {
    res.render('login/login');
});

router.post('/passport', passport.authenticate('local', { failureRedirect: '/error' }), (req, res) => {
    console.log('Posted');
});

module.exports = router;