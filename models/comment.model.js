let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    comment: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
});

module.exports = mongoose.model('Comment', CommentSchema);