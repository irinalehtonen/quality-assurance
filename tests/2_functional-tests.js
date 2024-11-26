// tests/2_functional-tests.js

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        done();
      });
  });

  test('Convert an invalid input such as 32g', function(done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });
});
