let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let YearSchema = new Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true}
});

module.exports = mongoose.model('Year', YearSchema);