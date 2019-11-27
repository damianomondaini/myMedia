let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TestSchema = new Schema({
    test: {type: String, required: true}
});

module.exports = mongoose.model('Test', TestSchema);