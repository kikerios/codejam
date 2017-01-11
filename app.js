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

//Routers
var router = express.Router();
var msp = express.Router();

//database connection
config.database_connect(mongoose);

router.get('/', function (req, res) {
    res.send("Hello World! (router)");
});

app.use(router);

//static files
app.use('/msp', express.static(__dirname + '/public/msp'));

msp.route('/msp')
        .get(mspCtrl.findAll)
        .post(mspCtrl.add);

msp.route('/msp/:id')
        .get(mspCtrl.findById)
        .put(mspCtrl.update)
        .delete(mspCtrl.delete);

app.use('/api', msp);

app.use(function (req, res, next) {
    res.status(404).send(config.error_response('Sorry cant find that!'));
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(config.error_response('Something broke!'));
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});