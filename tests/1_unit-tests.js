// tests/1_unit-tests.js

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('10L'), 10);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('10.5L'), 10.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3'), 'error');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('10L'), 'L');
    assert.equal(convertHandler.getUnit('10gal'), 'gal');
  });

  test('convertHandler should correctly return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
  });
  
  test('convertHandler should correctly convert gal to L', function() {
    assert.equal(convertHandler.convert(10, 'gal'), 37.8541);
  });
});
