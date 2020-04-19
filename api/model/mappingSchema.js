const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mappingSchema = new Schema({
    shortenKey: {type: String, required: true, unique: true},
    original: {type: String, required: true},
});

module.exports = mongoose.model('Mapping', mappingSchema);