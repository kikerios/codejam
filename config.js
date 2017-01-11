exports.database_connect = function (mongoose, database_url) {

    var database_url = 'mongodb://localhost/codejam';
    var db = mongoose.connection;

    db.on('connecting', function () {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });

    db.on('connected', function () {
        console.log('MongoDB connected!');
    });

    db.once('open', function () {
        console.log('MongoDB connection opened!');
    });

    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });

    db.on('disconnected', function () {
        console.log('MongoDB disconnected!');
        //mongoose.connect(database_url);
    });

    /**
     * connect database
     */
    mongoose.connect(database_url);

};

exports.error_response = function (error_message, errors) {

    var error_msn = {'error_message': error_message};

    if (errors)
        error_msn.errors = errors;

    return error_msn;
};

exports.get_id = function (model) {
    return {'id': model["_id"]};
};

exports.validate_msps_size = function (req) {

    var size = req.body.size;
    var va = req.body.va;
    var vb = req.body.vb;

    return (size == va.length && size == vb.length);
};

exports.get_msp = function (va, vb) {

    var new_va = JSON.parse(JSON.stringify(va));
    var new_vb = JSON.parse(JSON.stringify(vb));

    new_va.sort(function (a, b) {
        return a - b;
    });

    new_vb.sort(function (a, b) {
        return a - b;
    });

    console.log(new_va);
    console.log(new_vb);

    var length = new_va.length;
    var msp = 0;

    for (i = 0; i < length; i++) {
        msp += (new_va[i] * new_vb[length - 1 - i]);
    }

    return msp;
};