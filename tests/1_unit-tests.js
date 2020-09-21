var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
        var input = '32.1L';
        assert.equal(convertHandler.getNum(input),32.1);
        done();
      })

    
    test('Fractional Input', function(done) {
        var input = '1/2mi';
        assert.equal(convertHandler.getNum(input), 0.5);
        done();
      })

    
    test('Fractional Input w/ Decimal', function(done) {
      var input = "5.4/3lbs";
      assert.equal(convertHandler.getNum(input), "invalid unit")
      done(); 
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = "4.4/2.2/2L";
      assert.equal(convertHandler.getNum(input), "invalid unit");
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
    
  });

  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = '32mi';
      assert.equal(convertHandler.getUnit(input), "mi");
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = "hjf";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "gal";
      const galToL = 3.78541;
      const expectedResult = (initNum * galToL).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
    test('L to Gal', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "L";
      const galToL = 3.78541;
      const expectedResult = (initNum / galToL).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
    test('Mi to Km', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "mi";
      const miToKm = 1.60934;
      const expectedResult = (initNum * miToKm).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
    test('Km to Mi', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "km";
      const miToKm = 1.60934;
      const expectedResult = (initNum / miToKm).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "lbs";
      const lbsToKg = 0.453592;
      const expectedResult = (initNum * lbsToKg).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const initNum = Math.floor(Math.random() * 100);
      const initUnit = "kg";
      const lbsToKg = 0.453592;
      const expectedResult = (initNum / lbsToKg).toFixed(5);
      assert.equal(convertHandler.convert(initNum, initUnit), expectedResult)
      done();
    });
    
  });

});

