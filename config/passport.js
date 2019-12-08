let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user.model');
let { OAuth2Client } = require('google-auth-library');
let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, cb) => {    
    /*let token = req.body.token
    const ticket = client.verifyIdToken({
        idToken: token,
        audience: "753546703594-s8glhlfcilncqr5o30dkng1h67urn4bd.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];
    if (googleId != undefined && email != undefined && name != undefined && picture != undefined) {
        User.findOne({
            googleId: googleId
        }, (err, user) => {
            if (!user) {
                let user = new User({
                    googleId: googleId,
                    email: email,
                    name: name,
                    picture: picture
                });
                
                user.save((err, user) => {
                    if (err) throw err;
                    return cb(null, user);
                });
            } else {
                return cb(null, user);
            }
        });
    }*/
    return cb(null, user)
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            cb(err);
        } else {
            cb(null, user)
        }
    });
});