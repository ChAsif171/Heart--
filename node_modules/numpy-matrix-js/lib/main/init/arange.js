let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}

function arange(start, end, step) {
  if (step) {
    let result = new Array((end - start) / step);
    for (let i = 0; i < result.length; i++) {
      result[i] = start + i * step;
    }
    return result;
  } else if (end) {
    let result = new Array(end - start);
    for (let i = 0; i < result.length; i++) {
      result[i] = i + start;
    }
    return result;
  } else {
    let result = new Array(start);
    for (let i = 0; i < start; i++) {
      result[i] = i;
    }
    return result;
  }
}
if (typeof module != "undefined") {
  module.exports = arange;
} else {
  window.np["arange"] = arange;
}
