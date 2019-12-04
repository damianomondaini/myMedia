let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    googleId: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    picture: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);