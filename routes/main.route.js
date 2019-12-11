let express = require('express');
let router = express.Router();
let multer = require('multer')
let storage = require('../middleware/multer');
let upload = multer({ storage: storage });
let drive = require('../middleware/drive');

let categoryController = require('../controllers/category.controller');
let projectController = require('../controllers/project.controller');
let userConstroller = require('../controllers/user.controller');

router.get('/', categoryController.category_all, projectController.project_all, (req, res) => {
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

router.get('/profil/:googleId', userConstroller.user_profil, (req, res) => {
    res.render('profil/profil', {data: res.locals });
});


module.exports = router;
