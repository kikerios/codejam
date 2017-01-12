//GET - Return all ffi in the DB
exports.findAll = function (req, res) {

    var config = require('../config.js');
    var FfiModel = require('../models/file-fix-it.js');

    FfiModel.find(function (err, ffis) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('GET /ffi');
        res.status(200).jsonp(ffis);

    });

};

//GET - Return a ffis with specified path
exports.findByPath = function (req, res) {

    var config = require('../config.js');
    var FfiModel = require('../models/file-fix-it.js');

    var regexp = new RegExp("^" + req.query.path);
    FfiModel.find({path: regexp}, function (err, ffi) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('GET /ffi?path=' + req.query.path);
        res.status(200).jsonp(ffi);

    });
};

function parse_paths(paths) {

    var path_arrays = [];

    for (i = 0; i < paths.length; i++) {

        str = paths[i];

        firtsChar = str.substr(0, 1);
        str = (firtsChar == '/' ? str.substring(1, str.length) : str);

        lastChar = str.substr(-1);
        str = (lastChar == '/' ? str.substring(0, str.length - 1) : str);

        if (str) {
            path_arrays[i] = str;
        }

    }

    return path_arrays;
}

function load(obj) {

    if (obj.current_array != obj.arrays.length) {
        save(obj, obj.arrays[obj.current_array].split("/"), 0);
    } else {
        obj.res.status(200).jsonp({'mkdirs': obj.mkdirs});
    }

}

function save(obj, current_path, position) {

    var config = require('../config.js');
    var FfiModel = require('../models/file-fix-it.js');

    var parent = (position == 0 ? "/" : "/" + current_path.slice(0, position).join("/"));
    var name = current_path[position];

    //validate if exist
    FfiModel.findOne({path: parent, name: name}, function (err, ffi) {

        console.log("findOne");
        console.log(ffi);

        //error, go to next path
        if (err) {

            obj.current_array++;
            load(obj);

        }

        if (ffi != null) {

            console.log("exist, go to next");

            position++;

            if (position != current_path.length) {
                save(obj, current_path, position);
            } else {
                obj.current_array++;
                load(obj);
            }

        } else {

            console.log("create");

            obj.mkdirs++;

            var newFFI = new FfiModel({
                path: parent,
                name: name,
                mkdir: obj.mkdirs
            });

            console.log(newFFI);

            newFFI.save(function (err, ffi) {

                console.log("newFFI.save");
                console.log(ffi);

                position++;

                if (position != current_path.length) {
                    save(obj, current_path, position);
                } else {
                    obj.current_array++;
                    load(obj);
                }

            });
        }

    });


}

//POST - Insert a new ffi in the DB
exports.add = function (req, res) {

    var config = require('../config.js');
    var FfiModel = require('../models/file-fix-it.js');

    console.log('POST /ffi');
    console.log(req.body);

    try {

        load({
            current_array: 0,
            arrays: parse_paths(req.body.path),
            mkdirs: 0,
            req: req,
            res: res
        });

    } catch (err) {
        return res.status(500).jsonp(config.error_response(err.message, err.errors));
    }

};

//DELETE - Delete a ffi with specified ID
exports.delete = function (req, res) {

    var config = require('../config.js');
    var FfiModel = require('../models/file-fix-it.js');

    var regexp = new RegExp("^" + req.query.path);
    FfiModel.find({path: regexp}, function (err, ffis) {

        if (err)
            return res.status(500).jsonp(config.error_response(err.message, err.errors));

        console.log('DELETE /ffi?path=' + req.query.path);
        console.log(ffis);

        for (i = 0; i < ffis.length; i++) {
            ffis[i].remove(function (errs) {

                if (errs) {
                    console.log(errs);
                }

            });
        }

        res.status(200).send();

    });

};