var request = require('supertest');

describe('Minimum Scalar Product', function () {

    var url = 'http://162.218.236.112:3000';

    describe('Add', function (done) {

        it('test1:should return error trying to save different sizes', function () {

            var msp = {
                size: 2,
                va: [1, -5, -9, 6],
                vb: [0, -5, -7, 5]
            };

            request(url)
                    .post('/api/msp')
                    .send(msp)
                    .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        console.log("test1:" + JSON.stringify(res.body));

                        done();

                    });
        });

        it('test2:should return error trying to save a NaN', function () {

            var msp = {
                size: 3,
                va: [1, -5, 6],
                vb: ["cero", -7, 5]
            };

            request(url)
                    .post('/api/msp')
                    .send(msp)
                    .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        console.log("test2:" + JSON.stringify(res.body));

                        done();

                    });
        });

        it('test3:should correctly create', function (done) {

            var msp = {
                size: 4,
                va: [1, -5, -9, 6],
                vb: [0, -5, -7, 5]
            };

            request(url)
                    .post('/api/msp')
                    .send(msp)
                    .expect('Content-Type', /json/)
                    .expect(200) //Status code
                    .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        console.log("test3:" + JSON.stringify(res.body));

                        done();

                    });
        });

    });

});