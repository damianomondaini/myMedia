let express = require('express');
let router = express.Router();

let categoryController = require('../controllers/category.controller');

router.get('/dashboard', categoryController.admin_all_category, (req, res) => {
    res.render('admin/dashboard', { data: res.locals });
});

router.post('/category-add', categoryController.admin_add_category, (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/category-delete/:id', categoryController.admin_delete_category, (req, res) => {
    res.redirect('/admin/dashboard');
});

module.exports = router;
