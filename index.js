'use strict';

module.exports = function(object, noConsoleLog) {
  var print;
  switch(typeof object) {
    case 'null':
    case 'undefined':
      print = typeof object;
      break;
    case 'function':
      print = buildFunPrintString(object);
      break;
    case 'object':
      print = buildObjPrintString(object);
      break;
    default:
      print = object.toString();
      break;
  }

  if (!noConsoleLog) {
    console.log(print);
  }
  
  return print;
}

function buildFunPrintString(object) {
  // TODO: beautify output
  return object.toString();
}

function buildObjPrintString(object) {
  var output = "{\n";
  for (var prop in object) {
    if (prop !== null && prop !== undefined) {
      output += "\t" + prop + " (" + typeof object[prop] + ")"
      if (typeof object[prop] === 'string' 
        || typeof object[prop] === 'number'
        || typeof object[prop] === 'boolean') {
        output += ": " + object[prop] || "null" + "\n";
      } else {
        output += "\n";
      }
    }
  }
  return output + "}";
}