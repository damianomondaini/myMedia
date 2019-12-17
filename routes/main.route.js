let express = require('express');
let router = express.Router();
let multer = require('multer')
let storage = require('../middleware/multer');
let upload = multer({ storage: storage });
let drive = require('../middleware/drive');

let categoryController = require('../controllers/category.controller');
let projectController = require('../controllers/project.controller');
let userController = require('../controllers/user.controller');
let yearController = require('../controllers/year.controller');
let commentController = require('../controllers/comment.controller');

router.get('/', categoryController.category_all, projectController.project_all, yearController.year_all, (req, res) => {
    res.render('project/accueil', { data: res.locals });
});

router.get('/projet/details/:id', projectController.project_one, (req, res) => {
    res.render('project/details', { data: res.locals });
});

router.get('/projet/ajouter', categoryController.category_all, (req, res) => {
    res.render('project/ajouter', { data: res.locals });
});
router.post('/projet/ajouter', upload.single('media'), drive.uploadMedia, projectController.project_create,  (req, res) => {});

router.get('/projet/modifier/:id/:googleId', categoryController.category_all, projectController.project_one, (req, res) => {
    res.render('project/modifier', {data: res.locals });
});
router.post('/projet/modifier/:id/:googleId', projectController.project_mediaId, upload.single('media'), drive.deleteMedia, drive.uploadMedia, projectController.project_edit, (req, res) => {});

router.get('/projet/supprimer/:id/:googleId', projectController.project_delete, drive.deleteMedia, (req, res) => {
    res.redirect('/');
});

router.get('/profil/:googleId', userController.user_profil, yearController.year_all, (req, res) => {
    res.render('profil/profil', {data: res.locals });
});

router.get('/projet/category/:id', categoryController.category_all, projectController.project_category, yearController.year_all, (req, res) => {
    res.render('project/accueil', { data: res.locals });
});

router.get('/projet/year/:id', categoryController.category_all, projectController.project_year, yearController.year_all, (req, res) => {
    res.render('project/accueil', { data: res.locals });
});

router.get('/projet/decouvrir', projectController.project_random, (req, res) => {
    res.render('project/details', { data: res.locals });
});

router.post('/commentaire/ajouter', commentController.comment_add, (req, res) => {});

router.post('/profil/update', userController.user_update, (req, res) => {});

module.exports = router;
