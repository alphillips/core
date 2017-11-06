'use strict';

exports.__esModule = true;
var inject = exports.inject = function inject() {
  var css = '\n  .spinner {\n    -webkit-animation: sprc 1s linear infinite;\n       -moz-animation: sprc 1s linear infinite;\n        -ms-animation: sprc 1s linear infinite;\n         -o-animation: sprc 1s linear infinite;\n            animation: sprc 1s linear infinite;\n  }\n  @-moz-keyframes sprc {\n      from { -moz-transform: rotate(0deg); }\n      to { -moz-transform: rotate(360deg); }\n  }\n  @-webkit-keyframes sprc {\n      from { -webkit-transform: rotate(0deg); }\n      to { -webkit-transform: rotate(360deg); }\n  }\n  @keyframes sprc {\n      from {transform:rotate(0deg);}\n      to {transform:rotate(360deg);}\n  }\n  ';

  var head = document.head || document.getElementsByTagName('head')[0];
  var sprc = document.createElement('style');
  sprc.type = "text/css";
  if (sprc.styleSheet) {
    sprc.styleSheet.cssText = css;
  } else {
    sprc.appendChild(document.createTextNode(css));
  }
  if (head) {
    head.appendChild(sprc);
  }
};

var clamp = exports.clamp = function clamp(min, max, val) {
  if (min > val) return min;
  if (max < val) return max;
  return val;
};