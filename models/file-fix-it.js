var mongoose = require('mongoose'), Schema = mongoose.Schema;
var fileFixItSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mkdir: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('FileFixIt', fileFixItSchema); 