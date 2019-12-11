let passport = require('passport')
let Strategy = require('passport-local').Strategy
let bcrypt = require('bcryptjs')

let userController = require('../controllers/user.controller')

passport.use(new Strategy(
    (name, password, cb) => {
        userController.user_username(name, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return cb(err);
                    } else if (res) {
                        cb(null, user);
                    } else {
                        return cb(null, false);
                    }
                });
            } else {
                return cb(null, false);
            }
        });
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    userController.user_id(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});