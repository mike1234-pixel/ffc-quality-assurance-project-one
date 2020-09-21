function ConvertHandler() {
  
  this.getNum = function(input) {
    var indexOfFirstLetter = /[a-z]/i.exec(input).index;
    var number = input.slice(0, indexOfFirstLetter);
    if (number.includes('/') && number.includes(".")) {
      return "invalid unit";
    }
    if (number.includes('/')) {
      // convert fraction to decimal
      let a = "1/2";
      let split = a.split('/');
      let result = parseInt(split[0], 10) / parseInt(split[1], 10);
      number = result;
    }
    if (number === "") {
      number = 1;
    }
    return number;
  }; // ✓
  
  this.getUnit = function(input) {
    var indexOfFirstLetter = /[a-z]/i.exec(input).index;
    var unit = input.slice(indexOfFirstLetter, input.length);

    if (/(mi|km|gal|l|lbs|kg)/.test(unit) === false) {
      return "invalid unit"
    }

    return unit;
  }; // ✓
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit) {
        case "mi":
        return "km";
      break;
        case "km":
        return "mi";
      break;
        case "gal":
        return "l";
      break;
        case "L":
        return "gal";
      break;
        case "l":
        return "gal";
      break;
        case "lbs":
        return "kg";
      break;
        case "kg":
        return "lbs";
      break;
        default:
      return "invalid unit";
    }
  }; // ✓


  this.spellOutUnit = function(unit) {
    switch(unit) {
        case "mi":
        return "miles";
      break;
        case "km":
        return "kilometers";
      break;
        case "gal":
        return "gallons";
      break;
        case "L":
        return "liters"
      break;
        case "l":
        return "liters";
      break;
        case "lbs":
        return "pounds";
      break;
        case "kg":
        return "kilograms";
      break;
        default:
      return "invalid unit";
    }
  };  // ✓
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    if (initUnit === "mi") {
      result = initNum * miToKm; 
    } else if (initUnit === "km") {
      result = initNum / miToKm;
    } else if (initUnit === "gal") {
      result = initNum * galToL;
    } else if (initUnit === "l" || initUnit === "L") {
      result = initNum / galToL;
    } else if (initUnit === "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      result = initNum / lbsToKg;
    }

    return result.toFixed(5);
  };  // ✓
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    
    return result;
  }; // ✓
  
}

module.exports = ConvertHandler;
