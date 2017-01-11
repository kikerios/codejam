//GET - Return all msp in the DB
exports.findAll = function (req, res) {

    var config = require('../config.js');
    var MspModel = require('../models/minimum-scalar-product.js');

    MspModel.find(function (err, msps) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('GET /msp')
        res.status(200).jsonp(msps);

    });

};

//GET - Return a msp with specified ID
exports.findById = function (req, res) {

    var config = require('../config.js');
    var MspModel = require('../models/minimum-scalar-product.js');

    MspModel.findById(req.params.id, function (err, msp) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('GET /msp/' + req.params.id);
        res.status(200).jsonp(msp);

    });
};

//POST - Insert a new msp in the DB
exports.add = function (req, res) {

    var config = require('../config.js');
    var MspModel = require('../models/minimum-scalar-product.js');

    console.log('POST /msp');
    console.log(req.body);

    // validate vector size
    if (!config.validate_msps_size(req))
        return res.status(500).jsonp(config.error_response("error msps size"));

    // get msp
    var final_msp = config.get_msp(req.body.va, req.body.vb);

    var newMsp = new MspModel({
        size: req.body.size,
        va: req.body.va,
        vb: req.body.vb,
        msp: final_msp
    });

    console.log(newMsp);

    newMsp.save(function (err, msp) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        res.status(200).jsonp(config.get_id(msp));

    });
};

//PUT - Update a register already exists
exports.update = function (req, res) {

    var config = require('../config.js');
    var MspModel = require('../models/minimum-scalar-product.js');

    MspModel.findById(req.params.id, function (err, updateMsp) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('PUT /msp/' + req.params.id);
        console.log(req.body);

        // validate vector size
        if (!config.validate_msps_size(req))
            return res.status(500).jsonp(config.error_response("error msps size"));

        // get msp
        var final_msp = config.get_msp(req.body.va, req.body.vb);

        updateMsp.size = req.body.size;
        updateMsp.va = req.body.va;
        updateMsp.vb = req.body.vb;
        updateMsp.msp = final_msp;

        updateMsp.save(function (err) {

            if (err)
                return res.status(500).jsonp(config.error_response(err.message, err.errors));

            res.status(200).jsonp(config.get_id(updateMsp));

        });

    });
};

//DELETE - Delete a msp with specified ID
exports.delete = function (req, res) {

    var config = require('../config.js');
    var MspModel = require('../models/minimum-scalar-product.js');

    MspModel.findById(req.params.id, function (err, msp) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('DELETE /msp/' + req.params.id);


        msp.remove(function (err) {

            if (err)
                return res.status(500).jsonp(config.error_response(err.message, err.errors));

            res.status(200).send();
        });

    });
};