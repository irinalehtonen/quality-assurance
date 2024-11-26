// routes/api.js

const express = require('express');
const ConvertHandler = require('../controllers/convertHandler');
const router = express.Router();
const convertHandler = new ConvertHandler();

router.get('/api/convert', function(req, res) {
  const input = req.query.input;

  if (!input) {
    return res.json({ error: 'No input provided' });
  }

  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (!unit) {
    return res.json({ error: 'Invalid unit' });
  }

  const returnUnit = convertHandler.getReturnUnit(unit);
  const convertedNum = convertHandler.convert(num, unit);
  const spelledOutUnit = convertHandler.spellOutUnit(unit);
  const returnSpelledOutUnit = convertHandler.spellOutUnit(returnUnit);

  res.json({
    initNum: num,
    initUnit: unit,
    returnNum: convertedNum,
    returnUnit: returnUnit,
    initUnitSpelled: spelledOutUnit,
    returnUnitSpelled: returnSpelledOutUnit,
  });
});

module.exports = router;
