let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {type: String, required: true},
    mediaType: {type: String, required: true},
    mediaLink: {type: String, required: false},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Project', ProjectSchema);