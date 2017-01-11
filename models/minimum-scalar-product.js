var mongoose = require('mongoose'), Schema = mongoose.Schema;

var minimumScalarProductSchema = new Schema({
    size: {
        type: Number,
        required: true
    },
    va: {
        type: [Number],
        required: true
    },
    vb: {
        type: [Number],
        required: true
    },
    msp: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('MinimumScalarProduct', minimumScalarProductSchema); 