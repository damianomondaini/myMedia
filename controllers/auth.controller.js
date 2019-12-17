let {OAuth2Client} = require('google-auth-library');
let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let User = require('../models/user.model');
let Year = require('../models/year.model');

exports.auth_verify = (req, res, next) => {
    if(req.body.token) {
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
                        Year.findOne({year: 1}).exec((err, year) => {
                            if(err) throw err;
                            let user = new User({
                                googleId: googleId,
                                email: email,
                                name: name,
                                picture: picture,
                                isAdmin: false,
                                year: year._id
                            });
        
                            user.save((err, user) => {
                                if (err) throw err;
                                res.json(googleId)
                            });
                        });
                    } else {
                        res.json(googleId)
                    }
                });
            }
        }
        verify().catch(console.error);
    }
    next();
}