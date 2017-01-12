var express = require('express');
var app = express();

var bodyParser = require("body-parser"), methodOverride = require("method-override"), mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// Config
var config = require('./config.js');

//Controllers
var mspCtrl = require('./controllers/minimum-scalar-product');
var ffiCtrl = require('./controllers/file-fix-it');

//Routers
var msp = express.Router();
var ffi = express.Router();

//database connection
config.database_connect(mongoose);

//static files
app.use('/', express.static(__dirname + '/public/home'));
app.use('/msp', express.static(__dirname + '/public/msp'));
app.use('/ffi', express.static(__dirname + '/public/ffi'));
app.use('/nodejs-challenge', express.static(__dirname + '/public/nodejs-challenge'));

//msp endpoints
msp.route('/msp')
        .get(mspCtrl.findAll)
        .post(mspCtrl.add);

msp.route('/msp/:id')
        .get(mspCtrl.findById)
        .put(mspCtrl.update)
        .delete(mspCtrl.delete);

app.use('/api', msp);

//ffi endpoints
ffi.route('/ffi')
        .get(function (req, res) {

            if (req.query.path) {
                ffiCtrl.findByPath(req, res);
                return;
            }

            ffiCtrl.findAll(req, res);

        })
        .delete(ffiCtrl.delete)
        .post(ffiCtrl.add);

app.use('/api', ffi);

//errors
app.use(function (req, res, next) {
    res.status(404).send(config.error_response('Sorry cant find that!'));
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(config.error_response('Something broke!'));
});

//listen
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});