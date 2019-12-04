let express = require('express');
let utilsGoogle = require('../config/utils-google');
let passport = require('passport');
let router = express.Router();

let test_controller = require('../controllers/test.controller');

router.get('/', test_controller.test_all, (req, res) => {
    res.render('test/test', { data: res.locals });
    console.log(req.session);
});

router.get('/:id/delete', test_controller.test_delete, (req, res) => {
    res.redirect('/test');
});

router.get('/:id/edit', test_controller.test_findById, (req, res) => {
    res.render('test/edit', { data: res.locals });
});

router.post('/post', test_controller.test_add, (req, res) => {
    res.redirect('/test');
});

router.post('/:id/edit', test_controller.test_edit, (req, res) => {
    res.redirect('/test');
});

router.get('/login', (req, res) => {
    res.render('login/login');
});

module.exports = router;