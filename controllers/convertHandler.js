function ConvertHandler() {
  
  // This function extracts the number from the input string
  this.getNum = function(input) {
    let result = input.match(/[\d/]+/); // Match the numeric part (whole number, decimal, or fraction)
    
    // If no number is found, default to 1
    if (!result) return 1;
    
    // Check if it’s a fraction (e.g., 1/2)
    if (result[0].includes('/')) {
      let fraction = result[0].split('/');
      // If the fraction is invalid (e.g., 3/0), return 'error'
      if (fraction.length !== 2 || isNaN(fraction[0]) || isNaN(fraction[1]) || fraction[1] == 0) {
        return 'error';
      }
      return parseFloat(fraction[0]) / parseFloat(fraction[1]);
    }
    
    // If it's just a whole or decimal number, return it
    return parseFloat(result[0]);
  };
  
  // This function extracts the unit from the input string
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/); // Match the unit part
    if (result) {
      return result[0].toLowerCase(); // Normalize to lowercase
    }
    return ''; // Return empty string if no unit is found
  };
  
  // This function returns the corresponding return unit for the conversion
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
  };

  // This function returns the spelled-out name of a unit
  this.spellOutUnit = function(unit) {
    const unitSpellOut = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitSpellOut[unit];
  };
  
  // This function performs the conversion between units
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541, // gal to L
      L: 0.264172, // L to gal
      mi: 1.60934, // mi to km
      km: 0.621371, // km to mi
      lbs: 0.453592, // lbs to kg
      kg: 2.20462, // kg to lbs
    };

    // If the conversion rate for the unit is not found, return 'error'
    if (!conversionRates[initUnit]) return 'error';

    // Perform the conversion using the appropriate rate
    return initNum * conversionRates[initUnit];
  };
  
  // This function formats the output string for the result
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    
    // Construct and return the string with the conversion result
    return `${initNum} ${initUnitSpelled} is equal to ${returnNum} ${returnUnitSpelled}`;
  };
}

module.exports = ConvertHandler;

