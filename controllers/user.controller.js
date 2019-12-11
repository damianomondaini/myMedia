let User = require('../models/user.model');
let Project = require('../models/project.model');
let Category = require('../models/category.model');

exports.user_profil = (req, res, next) => {
    if(req.params.googleId) {
        User.findOne({ googleId: req.params.googleId }, (err, user) => {
            if(!user) {
                res.redirect('/');
            } else {
                res.locals['user'] = user;
                Project.find({ user: user._id }).populate('category').populate('user').exec((err, projects) => {
                    if(!err) {
                        res.locals['projects'] = projects
                    }
                    next();
                });
            }
        });
    } else {
        res.redirect('/');
    }
}