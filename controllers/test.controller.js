let Test = require('../models/test.model');
let User = require('../models/user.model');
let {OAuth2Client} = require('google-auth-library');
let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.test_all = (req, res, next) => {
    Test.find((err, test) => {
        if (err) throw err;
        res.locals['test'] = test;

        next();
    });
};

exports.test_add = (req, res, next) => {
    if (req.body.test) {
        let test = new Test ({
            test: req.body.test
        });

        test.save((err) => {
            if (err) throw err;
            next();
        });
    }
};

exports.test_delete = (req, res, next) => {
    if (req.params.id) {
        Test.findByIdAndRemove(req.params.id, (err) => {
            if (err) throw err;
            next();
        });
    }
};

exports.test_edit = (req, res, next) => {
    if (req.params.id && req.body.test) {
        Test.findByIdAndUpdate(req.params.id, {
            $set: {
                test: req.body.test
            }
        }, {new: true}, (err) => {
            if (err) throw err;
            next();
        })
    }
};

exports.test_findById = (req, res, next) => {
    if (req.params.id) {        
        Test.findById(req.params.id, (err, test) => {            
            if (err) throw err;
            res.locals['test'] = test;

            next();
        });
    }
};

exports.getToken = (req, res, next) => {
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "753546703594-s8glhlfcilncqr5o30dkng1h67urn4bd.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email']; 
        const name = payload['name']; 
        const picture = payload['picture'];
        if(googleId != undefined && email != undefined && name != undefined && picture != undefined) {
            User.findOne({googleId: googleId}, (err, user) => {
                if(!user) {
                    let user = new User({
                        googleId: googleId,
                        email: email,
                        name: name,
                        picture: picture
                    });

                    user.save((err) => {
                        if (err) throw err;
                    });

                    req.session.googleId = googleId;
                    req.session.name = name;
                } else {
                    req.session.googleId = user.googleId;
                    req.session.name = user.name;
                }

                console.log(req.session);

            });
        }
        res.json(payload['name']);
        
    }
    verify().catch(console.error);
}