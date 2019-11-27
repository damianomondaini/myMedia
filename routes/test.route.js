let express = require('express');
let router = express.Router();

let test_controller = require('../controllers/test.controller');

router.get('/', test_controller.test_all, (req, res) => {
    res.render('test/test', { data: res.locals });
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

module.exports = router;