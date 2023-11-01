let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}

function zeros(rows, cols) {
  if (!cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
    }
    return arr;
  } else {
    let matrix = empty(rows, cols);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = 0;
      }
    }
    return matrix;
  }
}
if (typeof module != "undefined") {
  module.exports = zeros;
} else {
  window.np["zeros"] = zeros;
}
