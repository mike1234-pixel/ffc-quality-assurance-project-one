var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10l (valid input)', (done) => {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10l'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'l');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
        });
        done();
      });
      
      test('Convert 32g (invalid input unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '20hfz'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid unit")
            done();
          })
          
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '20hfz'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid unit")
            done();
          })
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '20hfz'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid unit")
            done();
          })     
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'l'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'l');
            assert.approximately(res.body.returnNum, 0.26417, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });

    });
  });
});
