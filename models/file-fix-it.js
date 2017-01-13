var mongoose = require('mongoose'), Schema = mongoose.Schema, deepPopulate = require('../lib/plugin.js')(mongoose)
        ;
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
    },
    childs: [{type: Schema.Types.ObjectId, ref: 'FileFixIt'}]

});
module.exports = mongoose.model('FileFixIt', fileFixItSchema); 
fileFixItSchema.plugin(deepPopulate)
