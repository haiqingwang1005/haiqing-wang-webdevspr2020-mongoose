const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    dataIndex: {type: String, required: true, unique: true},
    urls:
        [
            {
                url: {type: String, required: true},
                shortenKey: {type: String, required: true}
            }
        ],
});

module.exports = mongoose.model('Url', urlSchema);