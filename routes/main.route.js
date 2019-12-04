let express = require('express');
let router = express.Router();
let multer = require('multer')
let storage = require('../middleware/multer');
let upload = multer({ storage: storage });
let drive = require('../middleware/drive');

let categoryController = require('../controllers/category.controller');
let projectController = require('../controllers/project.controller');

router.get('/projet/ajouter', categoryController.category_all, (req, res) => {
    res.render('projet/ajouter', { data: res.locals });
});

router.post('/projet/ajouter', upload.single('media'), drive.uploadMedia, projectController.project_create,  (req, res) => {
    res.json('Lien du projet');  // Render throught JSON a redirection to the new article
});

module.exports = router;
