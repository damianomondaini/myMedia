let express = require('express');
let router = express.Router();
let authController = require('../controllers/auth.controller.js');

router.post('/verify', authController.auth_verify, (req, res) => {});

module.exports = router;