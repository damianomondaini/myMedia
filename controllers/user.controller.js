let User = require('../models/user.model');
let Project = require('../models/project.model');
let Category = require('../models/category.model');

exports.user_profil = (req, res, next) => {
    if(req.params.googleId) {
        User.findOne({ googleId: req.params.googleId }).populate('year').exec((err, user) => {
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

exports.user_update = (req, res, next) => {
    if(req.body.year && req.body.googleId) {
        User.findOneAndUpdate({googleId: req.body.googleId}, {
            $set: {
                year: req.body.year
            }
        }, (err, user) => {
            if (err) throw err;
            res.json(user);
        })
    }
}