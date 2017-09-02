'use strict';

module.exports = function(object) {
  switch(typeof object) {
    case 'null':
    case 'undefined':
      console.log(typeof object);
      break;
    case 'function':
      console.log(buildFunPrintString(object));
      break;
    case 'object':
      console.log(buildObjPrintString(object));
      break;
    default:
      console.log(object.toString());
      break;
  }
}

function buildFunPrintString(object) {
  return object.toString();
}

function buildObjPrintString(object) {
  return object.toString();
}