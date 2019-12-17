let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    googleId: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    picture: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    year: {type: Schema.Types.ObjectId, ref: 'Year'}
});

module.exports = mongoose.model('User', UserSchema);