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
    case 'undefined':
      print = typeof object;
      break;
    case 'function':
      print = buildFunPrintString(object);
      break;
    case 'object':
      if (object === null) {
        // typeof null === 'object', yeah, this is Javascript
        print = 'null';
      } else {
        print = buildObjPrintString(object, options.excludeNullVals, exclude);
      }
      break;
    default:
      print = `(${objType}): ${object.toString()}`;
      break;
  }

  if (options.logToConsole) {
    console.log(print);
  }
  
  return print;
}

function buildFunPrintString(object) {
  // TODO: beautify output
  return `(function): ${object.toString()}`;
}

function buildObjPrintString(obj, excludeNullVals, excludedPropTypes) {
  var val, valType, emptyVal, output;
  
  if (obj instanceof RegExp) {
    output = `(RegExp): ${obj.toString()}`;
  } else if (obj instanceof Date) {
    output = `(Date): ${obj.toString()}`;
  } else if (obj instanceof Promise) {
    output = `(Promise): ${obj.toString()}`;
  } else {
    // vanilla object
    var objType = (obj instanceof Array) ? 'array' : 'object';
    output = `(${objType}): {\n`;
    Object.getOwnPropertyNames(obj).forEach((prop, idx, array) => {
      if (prop !== null && prop !== undefined) {
        val = obj[prop];
        valType = val === null ? 'null': typeof val;
        emptyVal = (val === null || val === undefined);

        if (excludeNullVals && emptyVal) {
          return;
        } else if (!!excludedPropTypes && excludedPropTypes[valType]) {
          return;
        }

        output += `  ${prop} (${valType}): ${emptyVal ? val: val.toString()}\n`;
      }
    });
    output += "}";
  }

  return output;
}