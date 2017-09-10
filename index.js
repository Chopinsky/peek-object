'use strict';

var defaultOptions = {
  'logToConsole': false,
  'excludeNullVals': false,
  'excludedPropTypes': null
}

module.exports = function(object, options) {
  var print, exclude = new Object();
  var objType = typeof object;

  if (!options) {
    options = defaultOptions;
  }

  if (!!options.excludedPropTypes) {
    var types = options.excludedPropTypes;
    if (typeof types === 'string') {
      // if a single string type as the entry
      exclude[types] = true;
    } else if (typeof types === 'object' && ~~types.length > 0) {
      // if a string array of types as the entry
      types.forEach((t) => {
        if (typeof t === 'string') {
          exclude[t] = true;
        }
      }, this);
    }
  }

  if (exclude[objType]) {
    return null;
  }

  switch(objType) {
    case 'null':
    case 'undefined':
      if (!options.excludeNullVals) {
        print = typeof object;
      }
      break;
    case 'function':
      print = buildFunPrintString(object);
      break;
    case 'object':
      print = buildObjPrintString(object, options.excludeNullVals, exclude);
      break;
    default:
      print = object.toString();
      break;
  }

  if (options.logToConsole) {
    console.log(print);
  }
  
  return print;
}

function buildFunPrintString(object) {
  // TODO: beautify output
  return object.toString();
}

function buildObjPrintString(object, excludeNullVals, excludedPropTypes) {
  var output = "{\n";
  var val, valType;

  for (var prop in object) {
    if (prop !== null && prop !== undefined) {
      val = object[prop];
      valType = typeof val;

      if (excludeNullVals && (val === null || val === undefined)) {
        continue;
      } else if (!!excludedPropTypes && excludedPropTypes[valType]) {
        continue
      }

      output += `  ${prop} (${typeof val}): ${val.toString()}\n`;
    }
  }

  return output + "}";
}