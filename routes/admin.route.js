let express = require('express');
let router = express.Router();

let categoryController = require('../controllers/category.controller');
let projectController = require('../controllers/project.controller');
let yearController = require('../controllers/year.controller');

router.get('/dashboard', categoryController.admin_all_category, projectController.admin_all_project, (req, res) => {
    res.render('admin/dashboard', { data: res.locals });
});

router.post('/category-add', categoryController.admin_add_category, (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/category-delete/:id', categoryController.admin_delete_category, (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/project-delete/:id', projectController.admin_delete_project, (req, res) => {
    res.redirect('/admin/dashboard');
});

router.post('/year-add', yearController.admin_add_year, (req, res) => {
    res.redirect('/admin/dashboard');
});

module.exports = router;