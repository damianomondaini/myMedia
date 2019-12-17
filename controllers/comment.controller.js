let Comment = require('../models/comment.model');
let User = require('../models/user.model');

exports.comment_add = (req, res, next) => {
    if(req.body.id && req.body.googleId && req.body.comment) {
        User.findOne({googleId: req.body.googleId}, (err, user) => {
            if(err) throw err;
            if(user) {
                let comment = new Comment({
                    comment: req.body.comment,
                    user: user._id,
                    project: req.body.id
                });

                comment.save((err, comment) => {
                    res.json(comment);
                });
            } else {
                res.redirect('/');
            }
        });
    }
}