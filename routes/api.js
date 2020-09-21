/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')    
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);     
      var returnUnit = convertHandler.getReturnUnit(initUnit);

      if (returnUnit === "invalid unit" || initNum === "invalid unit") {
      res.send({"error": "invalid unit"})
    } else {
      var returnNum = convertHandler.convert(initNum, initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.send({
        "initNum": parseFloat(initNum),
        "initUnit": initUnit,
        "returnNum": parseFloat(returnNum),
        "returnUnit": returnUnit,
        "string": toString
      })

    }
  });    
};
